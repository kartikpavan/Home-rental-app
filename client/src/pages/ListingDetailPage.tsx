import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Listing } from "../types";
import { facilities } from "../utils/data";

const ListingDetailPage = () => {
  const { id: listingId } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [listingDetails, setListingDetails] = useState<Listing>(null);

  const fetchListingDetails = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:5000/api/listings/" + listingId);
      const { data } = await response.json();
      console.log(data);
      setListingDetails(data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchListingDetails();
  }, [listingId]);

  return (
    <>
      {isLoading && <div className="text-3xl mt-20">Loading...</div>}
      <main className="px-3 md:container mx-auto pt-20">
        <h1 className="text-2xl font-semibold">{listingDetails?.title}</h1>
        {/* images */}
        <div className="flex flex-wrap gap-5 w-full py-5">
          {listingDetails?.images.map((image) => {
            return (
              <img
                key={image.url}
                className="w-full rounded-md sm:w-[40%] h-full object-contain"
                src={image.url}
                alt="image"
              />
            );
          })}
        </div>
        {/* Address */}
        <p className="text-lg font-semibold pt-5">
          {listingDetails?.apartmentSuite}, {listingDetails?.city}, {listingDetails?.country}
        </p>
        {/* guests info */}
        <div className="flex gap-5 flex-wrap pt-5">
          <h2 className="badge badge-outline badge-primary">{listingDetails?.guests} Guests</h2>
          <h2 className="badge badge-outline badge-primary">
            {listingDetails?.bathrooms} Bathrooms
          </h2>
          <h2 className="badge badge-outline badge-primary">{listingDetails?.bedrooms} Bedrooms</h2>
          <h2 className="badge badge-outline badge-primary">{listingDetails?.beds} Beds</h2>
        </div>
        <div className="divider"></div>
        {/* author */}
        <div className="flex gap-2 items-center">
          <img
            src={listingDetails?.author.profileImage.url}
            alt="DP"
            className="w-14 h-14 object-contain rounded-full"
          />
          <p className=" font-semibold">
            Hosted by - {listingDetails?.author.firstName} {listingDetails?.author.lastName}
          </p>
        </div>
        <div className="divider"></div>
        {/* Description */}
        <h1 className="font-semibold">Description</h1>
        <p className="text-gray-700 pt-5">{listingDetails?.description}</p>
        <div className="divider"></div>
        {/* highlights */}
        <h1 className="font-semibold">Highlights</h1>
        <p className="text-gray-700 pt-5">{listingDetails?.highlight}</p>
        <div className="divider"></div>
        <h1 className="font-semibold text-lg">What this place has to offer </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-start gap-5 py-5">
          {listingDetails?.facilities.map((item) => {
            const facility = facilities.find((f) => f.value === item);
            const { value, icon: Icon } = facility;
            if (facility) {
              return (
                <div
                  key={value}
                  className="flex gap-5 rounded-md border border-primary shadow-md p-3">
                  <Icon className="text-primary" />
                  <p>{value}</p>
                </div>
              );
            }
            return null;
          })}
        </div>
      </main>
    </>
  );
};

export default ListingDetailPage;
