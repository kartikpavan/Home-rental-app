import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useDispatch } from "react-redux";
import { setListing } from "../redux/userSlice";
import ListingCard from "../components/shared/ListingCard";

const MyListingsPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { user } = useSelector((store: RootState) => store.user);
  const dispatch = useDispatch();

  const fetchListings = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:5000/api/user/${user?._id}/listings`);
      const { data } = await response.json();
      dispatch(setListing(data));
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "My Listings -  Dream Harbor";
    fetchListings();
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
            <h1 className="text-2xl font-semibold">My Listings</h1>
            {user?.myProperties.length < 1 ? (
              <p className="text-2xl text-primary p-3 bg-white text-center rounded-md shadow-sm  my-5">
                You have no listings
              </p>
            ) : (
              <section className="px-3 md:container mx-auto pt-10 pb-20 flex gap-x-10 gap-y-20 flex-wrap ">
                {user?.myProperties?.map((item) => {
                  return (
                    <ListingCard
                      categories={item.categories}
                      listingId={item._id}
                      title={item.title}
                      accomodation={item.accomodation}
                      images={item.images}
                      price={item.price}
                    />
                  );
                })}
              </section>
            )}
          </section>
        </main>
      )}
    </>
  );
};

export default MyListingsPage;
