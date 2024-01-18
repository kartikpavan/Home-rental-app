import { useDispatch } from "react-redux";
import { categories } from "../utils/data";
import { useEffect, useState } from "react";
import { setListing } from "../redux/listingSlice";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import ListingCard from "./shared/ListingCard";

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
               ? `http://localhost:5000/api/listings?category=${selectedCategory}`
               : "http://localhost:5000/api/listings"
         );
         const { data } = await response.json();
         console.log(data);
         dispatch(setListing(data));
      } catch (error) {
         console.log(error);
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
                        className="w-full max-w-32 h-24 rounded-md shadow-md border border-gray-300 p-5 grid place-items-center gap-3">
                        <p>{label}</p>
                        <Icon />
                     </div>
                  );
               })}
            </section>
            {isLoading ? (
               <p className="text-4xl font-bold">Loading...</p>
            ) : (
               <section className="px-3 md:container mx-auto pt-10 pb-20 flex gap-x-10 gap-y-20 flex-wrap justify-center">
                  {listings.map((listing) => {
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
                  })}
               </section>
            )}
         </div>
      </>
   );
};

export default Listings;
