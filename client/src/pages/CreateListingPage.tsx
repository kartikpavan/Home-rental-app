import { SubmitHandler, useForm } from "react-hook-form";
import { categories, facilities, placeTypes } from "../utils/data";
import React, { useState } from "react";
import { Trash, Upload } from "lucide-react";
import CartBtn from "../components/shared/CartBtn";

type FormData = {
   streetAddress: string;
   apartmentSuite: string;
   city: string;
   country: string;
   pinCode: string;
   myPhotos: FileList;
};

const CreateListingPage = () => {
   const [selectedCategories, setSelectedCategories] = useState([]);
   // Upload / drag / drop and remove photos
   const [photos, setPhotos] = useState([]);
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<FormData>();

   // Category Selection
   const handleCategorySelection = (category: any) => {
      // Check if the category is already selected
      const isCategorySelected = selectedCategories.includes(category);
      // Update the selected categories based on whether the category is already selected or not
      if (isCategorySelected) {
         setSelectedCategories(
            selectedCategories.filter((selectedCategory) => selectedCategory !== category)
         );
      } else {
         setSelectedCategories([...selectedCategories, category]);
      }
   };

   // Upload photos
   const handleUploadPhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newPhotos = e.target.files;
      setPhotos((prev) => [...prev, ...newPhotos]);
   };

   // remove photo
   const handleRemovePhoto = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      itemToRemove: string
   ) => {
      e.preventDefault();
      setPhotos((prev) => prev.filter((photo, idx) => photo.name !== itemToRemove));
   };

   const onSubmit: SubmitHandler<FormData> = (data) => {
      console.log(data);
   };

   return (
      <main className="px-3 md:container mx-auto pt-20">
         <h1 className="py-10 text-3xl font-semibold text-primary-content">List your Place</h1>
         <form onSubmit={handleSubmit(onSubmit)}>
            {/* Step 1: Tell us about your place */}
            <section className="bg-white p-10 rounded-md">
               <article>
                  <h1 className="text-xl font-semibold text-secondary">
                     Step 1: Tell us about your place
                  </h1>
                  <div className="divider"></div>
                  <h2 className="font-semibold text-lg text-primary-content">
                     Which of these categories best describe your place ?
                  </h2>
                  <div className="flex flex-wrap gap-x-6 gap-y-12 pt-5 justify-center md:px-20">
                     {categories.map((category) => {
                        const { label, icon: Icon } = category;
                        const isSelected = selectedCategories.includes(category);
                        return (
                           <div
                              onClick={() => handleCategorySelection(category)}
                              key={category.label}
                              className={`w-full max-w-32 h-24 rounded-md shadow-md border ${
                                 isSelected ? "border-green-500" : "border-gray-300"
                              } p-5 grid place-items-center gap-3`}>
                              <Icon />
                              <p className="text-sm text-center">{label}</p>
                           </div>
                        );
                     })}
                  </div>
               </article>
               {/* Type of place */}
               <article className="pt-10">
                  <h2 className="font-semibold text-lg text-primary-content">
                     What type of place will guests have ?
                  </h2>
                  <div className="space-y-5 md:px-20 pt-10">
                     {placeTypes.map((item) => {
                        const { name, value, description, icon: Icon } = item;
                        return (
                           <div
                              key={value}
                              className=" w-full shadow-md border rounded-md  flex items-center justify-between p-5">
                              <div className="flex flex-col gap-5">
                                 <p className="font-semibold">{name}</p>
                                 <p className="text-sm">{description}</p>
                              </div>
                              <Icon className="hidden sm:flex" />
                           </div>
                        );
                     })}
                  </div>
               </article>
               {/* Place Location */}
               <article className="pt-10">
                  <h2 className="font-semibold text-lg text-primary-content">
                     Where is your Place Located ?
                  </h2>
                  <div className="md:px-20 pt-10 space-y-5">
                     <div>
                        <label htmlFor="streetAddress">Street Address</label>
                        <input
                           className="w-full px-4 py-2 border border-gray-300 rounded"
                           type="text"
                           id="streetAddress"
                           {...register("streetAddress", {
                              required: "Street address is required",
                              minLength: {
                                 value: 1,
                                 message: "Street address must be at least 1 character",
                              },
                              maxLength: {
                                 value: 100,
                                 message: "Street address cannot exceed 100 characters",
                              },
                           })}
                        />
                        {errors.streetAddress && <span>{errors.streetAddress.message}</span>}
                     </div>
                     <section className="flex flex-col md:flex-row md:gap-10">
                        <div className="flex-1">
                           <label htmlFor="apartmentSuite">Apartment, Suite</label>
                           <input
                              className="w-full px-4 py-2 border border-gray-300 rounded"
                              type="text"
                              id="apartmentSuite"
                              {...register("apartmentSuite", {
                                 required: "Apartment/suite is required",
                                 minLength: {
                                    value: 1,
                                    message: "Apartment/suite must be at least 1 character",
                                 },
                                 maxLength: {
                                    value: 100,
                                    message: "Apartment/suite cannot exceed 100 characters",
                                 },
                              })}
                           />
                           {errors.apartmentSuite && <span>{errors.apartmentSuite.message}</span>}
                        </div>
                        <div className="flex-1">
                           <label htmlFor="city">City</label>
                           <input
                              className="w-full px-4 py-2 border border-gray-300 rounded"
                              type="text"
                              id="city"
                              {...register("city", {
                                 required: "City is required",
                                 minLength: {
                                    value: 1,
                                    message: "City must be at least 1 character",
                                 },
                                 maxLength: {
                                    value: 50,
                                    message: "City cannot exceed 50 characters",
                                 },
                              })}
                           />
                           {errors.city && <span>{errors.city.message}</span>}
                        </div>
                     </section>
                     <section className="flex flex-col md:flex-row md:gap-10">
                        <div className="flex-1">
                           <label htmlFor="country">Country</label>
                           <input
                              className="w-full px-4 py-2 border border-gray-300 rounded"
                              type="text"
                              id="country"
                              {...register("country", {
                                 required: "Country is required",
                                 minLength: {
                                    value: 1,
                                    message: "Country must be at least 1 character",
                                 },
                                 maxLength: {
                                    value: 50,
                                    message: "Country cannot exceed 50 characters",
                                 },
                              })}
                           />
                           {errors.country && <span>{errors.country.message}</span>}
                        </div>
                        <div className="flex-1">
                           <label htmlFor="pinCode">PIN Code</label>
                           <input
                              className="w-full px-4 py-2 border border-gray-300 rounded"
                              type="number"
                              id="pinCode"
                              {...register("pinCode", {
                                 required: "PIN Code is required",
                                 pattern: {
                                    value: /^[0-9]{6}$/, // Matches exactly 6 digits
                                    message: "PIN Code must be exactly 6 digits",
                                 },
                              })}
                           />
                           {errors.pinCode && <span>{errors.pinCode.message}</span>}
                        </div>
                     </section>
                  </div>
               </article>
               {/* basic information about the place */}
               <article className="pt-10">
                  <h2 className="font-semibold text-lg text-primary-content">
                     Share some basic information about the place
                  </h2>
                  <div className="md:px-20 pt-10 flex justify-between flex-wrap gap-y-6">
                     <CartBtn title="Guests" />
                     <CartBtn title="Bedrooms" />
                     <CartBtn title="Beds" />
                     <CartBtn title="Bathrooms" />
                  </div>
               </article>
            </section>

            {/* Step 2: Make your Place standout */}
            <section className="bg-white p-10 rounded-md mt-20">
               <article>
                  <h1 className="text-xl font-semibold text-secondary">
                     Step 2: Make your Place standout{" "}
                  </h1>
                  <div className="divider"></div>
                  <h2 className="font-semibold text-lg text-primary-content">
                     Tell what your place has to offer.
                  </h2>
                  <div className="md:px-20 pt-10 flex flex-wrap justify-center gap-5">
                     {facilities.map((item) => {
                        const { name, icon: Icon } = item;
                        return (
                           <div
                              key={name}
                              className="max-w-52 w-full flex flex-col items-center justify-center gap-2 p-5 rounded-md shadow-md border">
                              <Icon />
                              <p className="text-center">{name}</p>
                           </div>
                        );
                     })}
                  </div>
               </article>
               <article className="pt-10">
                  <h2 className="font-semibold text-lg text-primary-content">
                     Add some photos of your place to make it stand out
                  </h2>
                  <div>
                     {/* If there are photos */}
                     {photos.length < 1 && (
                        <>
                           <input
                              id="img"
                              className="hidden"
                              type="file"
                              accept="image/*"
                              onChange={handleUploadPhotos}
                              // {...register("myPhotos", { required: "Upload at least one photo" })}
                           />
                           <label
                              htmlFor="img"
                              className="mt-10 mx-auto max-w-96 w-full h-60 border-dashed border-2 flex flex-col gap-2 justify-center items-center border-gray-300 rounded-md">
                              <Upload size={"32"} />
                              <p className="text-center text-lg font-semibold">Upload Photos</p>
                           </label>
                           {errors.myPhotos && <span>{errors.myPhotos.message}</span>}
                        </>
                     )}
                     {/* display photos*/}
                     {photos.length >= 1 && (
                        <>
                           <div className="flex gap-5 px-20 pt-10">
                              {photos.map((photo, idx) => {
                                 return (
                                    <div
                                       className="relative flex max-w-72 flex-wrap w-full "
                                       key={idx}>
                                       <img
                                          src={URL.createObjectURL(photo)}
                                          alt="photo"
                                          className="object-cover w-full"
                                       />
                                       <button
                                          className="btn btn-error btn-xs absolute top-0 right-0 rounded-none"
                                          onClick={(e) => handleRemovePhoto(e, photo.name)}>
                                          <Trash size={16} />
                                       </button>
                                    </div>
                                 );
                              })}
                           </div>
                           <input
                              id="img2"
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={handleUploadPhotos}
                           />
                           <label
                              htmlFor="img2"
                              className="mt-10 mx-auto max-w-96 w-full h-60 border-dashed border-2 flex flex-col gap-2 justify-center items-center border-gray-300 rounded-md">
                              <Upload size={"32"} />
                              <p className="text-center text-lg font-semibold">Upload Photos</p>
                           </label>
                        </>
                     )}
                  </div>
               </article>
            </section>
         </form>
      </main>
   );
};

export default CreateListingPage;
