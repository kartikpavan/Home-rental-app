import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../api/apiClient";
import { useDispatch } from "react-redux";
import { setListing } from "../redux/listingSlice";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import ListingCard from "../components/shared/ListingCard";
import CardSkeleton from "../components/shared/CardSkeleton";

const CategoryPage = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const { listings } = useSelector((store: RootState) => store.listing);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/api/listings?category=${category}`);
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
    document.title = `${category} -  Dream Harbor`;
    fetchData();
  }, [category]);

  return (
    <main className="main-bg w-full h-screen">
      <section className="px-3 md:container mx-auto pt-20 pb-20 ">
        <h1 className="text-xl">
          Showing Results for "
          <span className="text-primary font-semibold underline underline-offset-4">
            {category}
          </span>
          " Category
        </h1>
        {isLoading ? (
          <CardSkeleton />
        ) : (
          <section className="px-3 md:container mx-auto pt-10 pb-20 flex gap-x-10 gap-y-20 flex-wrap justify-center">
            {listings?.length > 0 ? (
              listings?.map((listing) => {
                return (
                  <ListingCard
                    key={listing._id}
                    listingId={listing._id}
                    title={listing.title}
                    categories={listing.categories}
                    images={listing.images}
                    price={listing.price}
                    accomodation={listing.accomodation}
                  />
                );
              })
            ) : (
              <p className="text-center font-bold text-xl ">
                No listings found for{" "}
                <span className="underline italic text-primary-content/80">"{category}"</span>{" "}
                category
              </p>
            )}
          </section>
        )}
      </section>
    </main>
  );
};

export default CategoryPage;
