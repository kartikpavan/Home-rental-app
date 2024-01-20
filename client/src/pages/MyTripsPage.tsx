import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setTripList } from "../redux/userSlice";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Link } from "react-router-dom";
import { API_URL } from "../api/apiClient";
import CardSkeleton from "../components/shared/CardSkeleton";

const MyTripsPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store: RootState) => store.user);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchTrips = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/api/user/${user?._id}/trips`);
      const { data } = await response.json();
      dispatch(setTripList(data));
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
    window.scrollTo(0, 0);
    document.title = "My Trips -  Dream Harbor";
  }, [user?._id]);

  return (
    <>
      {isLoading ? (
        <CardSkeleton />
      ) : (
        <main className="main-bg w-full h-screen">
          <section className="px-3 md:container mx-auto pt-20 pb-20 ">
            <h1 className="text-2xl font-semibold">My Trips</h1>
            {user?.myTrips?.length === 0 && (
              <p className="text-2xl text-primary p-3 bg-white text-center rounded-md shadow-sm  my-5">
                You have no trips
              </p>
            )}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-10 pb-20">
              {user?.myTrips &&
                user?.myTrips?.map((trip) => {
                  const { accomodation, name, startDate, endDate, price, listingId } = trip;
                  return (
                    <Link
                      to={`/listing/${listingId}`}
                      className="flex flex-col rounded-lg shadow-md overflow-hidden h-full">
                      <div className="relative">
                        {trip?.images?.length > 0 && (
                          <img
                            className="w-full h-56 object-cover"
                            src={trip?.images[0]?.url}
                            alt={""}
                          />
                        )}
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-800 bg-opacity-75 text-white">
                          <h1 className="uppercase font-semibold text-lg">{accomodation}</h1>
                          <h2 className="text-xl font-bold mt-2">{name}</h2>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between">
                          <p className="text-gray-500">Start Date: </p>
                          <p>{startDate}</p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-gray-500">End Date: </p>
                          <p>{endDate}</p>
                        </div>
                        <div className="mt-4 flex justify-between">
                          <p className="text-primary">Total Price: </p>
                          <p className="text-primary font-semibold">₹{price}</p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
            </section>
          </section>
        </main>
      )}
    </>
  );
};

export default MyTripsPage;
