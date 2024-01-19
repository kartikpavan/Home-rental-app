import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Listing } from "../types";
import { facilities } from "../utils/data";
import toast, { Toaster } from "react-hot-toast";

import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const ListingDetailPage = () => {
  const { id: listingId } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((store: RootState) => store.user);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [listingDetails, setListingDetails] = useState<Listing>(null);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  // handle date select
  const handleDateSelect = (ranges: any) => {
    setDateRange([ranges.selection]);
  };

  const startDate = new Date(dateRange[0].startDate);
  const endDate = new Date(dateRange[0].endDate);
  const count = Math.round(endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);

  const fetchListingDetails = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:5000/api/listings/" + listingId);
      const { data } = await response.json();
      setListingDetails(data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBooking = async () => {
    const formData = {
      customerId: user?._id,
      listingId: listingId,
      hostId: listingDetails?.author._id,
      startDate: dateRange[0].startDate.toDateString(),
      endDate: dateRange[0].endDate.toDateString(),
      totalPrice: listingDetails?.price * count,
    };
    try {
      setIsSubmitting(true);
      const response = await fetch("http://localhost:5000/api/booking/create-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        toast.success("Booking successful");
        navigate(`/${user?._id}/trips`);
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Could not book : Check console");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchListingDetails();
  }, [listingId]);

  return (
    <>
      <Toaster />
      {isLoading && (
        <div className="flex justify-center mt-20">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
      <main className="px-3 md:container mx-auto pt-20 pb-20">
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
        {/* Address and accomodation*/}
        <p className="text-lg font-semibold pt-5">
          An {listingDetails?.accomodation} in {listingDetails?.apartmentSuite},{" "}
          {listingDetails?.city}, {listingDetails?.country}
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
        <h1 className="text-xl font-semibold">Description</h1>
        <p className="text-gray-700 pt-5">{listingDetails?.description}</p>
        <div className="divider"></div>
        {/* highlights */}
        <h1 className="font-semibold text-xl">Highlights</h1>
        <p className="text-gray-700 pt-5">{listingDetails?.highlight}</p>
        <div className="divider"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2  place-items-start gap-5 pb-10">
          <div>
            <h1 className="font-semibold text-xl">What this place has to offer </h1>
            {/* Facilities provided */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 place-items-start gap-5 pt-10">
              {listingDetails?.facilities.map((item) => {
                const facility = facilities.find((f) => f.value === item);
                const { name, icon: Icon } = facility;
                if (facility) {
                  return (
                    <div
                      key={name}
                      className="flex gap-5 rounded-md border border-primary shadow-md p-3">
                      <Icon className="text-primary" />
                      <p>{name}</p>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
          {/* Calendar */}
          <div>
            <h1 className="text-xl font-semibold">How long do you want to stay ? </h1>
            <DateRange ranges={dateRange} onChange={handleDateSelect} className="mt-4" />
          </div>
        </div>
        <div className="divider"></div>
        {/* Price Calculations */}
        <div className="space-y-3">
          <h1 className="font-semibold text-xl">See what's your Itenary looks like </h1>
          <div className="p-3 rounded-md shadow-md shadow-primary">
            <div className="flex flex-wrap items-center justify-around flex-col sm:flex-row">
              <h2 className="text-xl font-semibold text-primary-content">
                {count > 1
                  ? `₹${listingDetails?.price} x ${count} nights`
                  : `₹${listingDetails?.price} x ${count} night`}
              </h2>
              <h2 className="text-gray-600">
                {" "}
                Start Date : {dateRange[0].startDate.toDateString()}
              </h2>
              <h2 className="text-gray-600"> End Date : {dateRange[0].endDate.toDateString()}</h2>
            </div>
          </div>
          <div className="flex flex-col gap-5 sm:flex-row items-center justify-between pt-5">
            <p className="text-2xl font-semibold text-primary border p-2 rounded-md border-primary ">
              Total Price : ₹{listingDetails?.price * count}
            </p>
            <button
              onClick={handleBooking}
              disabled={isSubmitting}
              type="submit"
              className="btn btn-primary btn-lg btn-wide">
              {isSubmitting && <span className="loading loading-spinner loading-md"></span>}
              BOOK NOW
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default ListingDetailPage;
