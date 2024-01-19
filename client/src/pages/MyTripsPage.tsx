import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setTripList } from "../redux/userSlice";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Link } from "react-router-dom";

const MyTripsPage = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((store: RootState) => store.user);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fetchTrips = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:5000/api/user/${userId}/trips`);
      const { data } = await response.json();
      dispatch(setTripList(data));
      console.log(data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "My Trips -  Dream Harbor";
    fetchTrips();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center pt-20">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <main className="main-bg w-full h-screen">
          <section className="px-3 md:container mx-auto pt-20 pb-20 ">
            <h1 className="text-2xl font-semibold">My Trips</h1>
            <section className="w-full py-5 flex gap-5 flex-wrap">
              {user?.myTrips.map((trip) => {
                const { accomodation, images, name, startDate, endDate, price, listingId } = trip;
                return (
                  <Link
                    to={`/listing/${listingId}`}
                    className="max-w-lg w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="md:flex items-center justify-center">
                      <div className="md:flex-shrink-0">
                        <img
                          className="h-48 rounded-md w-full object-cover md:w-48"
                          src={images[0].url}
                          alt={name}
                        />
                      </div>
                      <div className="p-8">
                        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                          {accomodation}
                        </div>
                        <h2 className="mt-2 text-xl leading-7 font-bold text-gray-900">{name}</h2>
                        <p className="mt-2 text-gray-500">Start Date: {startDate}</p>
                        <p className="mt-2 text-gray-500">End Date: {endDate}</p>
                        <p className="mt-2 text-lg text-primary">Total Price: ₹{price}</p>
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
