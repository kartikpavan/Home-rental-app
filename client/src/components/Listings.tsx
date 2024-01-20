import { useDispatch } from "react-redux";
import { categories } from "../utils/data";
import { useEffect, useState } from "react";
import { setListing } from "../redux/listingSlice";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import ListingCard from "./shared/ListingCard";
import { API_URL } from "../api/apiClient";
import CardSkeleton from "./shared/CardSkeleton";

const Listings = () => {
  const dispatch = useDispatch();
  const { listings } = useSelector((store: RootState) => store.listing);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchListing = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        selectedCategory !== "All"
          ? `${API_URL}/api/listings?category=${selectedCategory}`
          : `${API_URL}/api/listings`
      );
      const { data } = await response.json();
      dispatch(setListing(data));
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchListing();
  }, [selectedCategory]);

  return (
    <>
      <div className="py-5">
        <h1 className="text-3xl font-bold text-primary-content text-center my-10 ">
          All Property Listings
        </h1>
        <section className="px-3 md:container mx-auto flex gap-5 flex-wrap justify-center my-10">
          {categories.map((category, idx) => {
            const { label, icon: Icon } = category;
            return (
              <div
                key={idx}
                onClick={() => setSelectedCategory(label)}
                className={`w-full max-w-32 h-24 rounded-md shadow-md border p-5 grid place-items-center gap-3 ${
                  label === selectedCategory
                    ? "border-primary border-1 bg-primary/10"
                    : "border-gray-300"
                }`}>
                <p className="text-primary-content">{label}</p>
                <Icon />
              </div>
            );
          })}
        </section>
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
                <span className="underline italic text-primary-content/80">
                  "{selectedCategory}"
                </span>{" "}
                category
              </p>
            )}
          </section>
        )}
      </div>
    </>
  );
};

export default Listings;
