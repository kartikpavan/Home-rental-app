import { SubmitHandler, useForm } from "react-hook-form";
import { categories, facilities, placeTypes } from "../utils/data";
import { useEffect } from "react";
import { Trash, UploadCloud } from "lucide-react";
import CartBtn from "../components/createListingLocalComponents/CartBtn";
import { CreateListingFormData } from "../types";
import ListingCategories from "../components/createListingLocalComponents/ListingCategories";

const CreateListingPage = () => {
   const {
      register,
      handleSubmit,
      watch,
      setValue,
      formState: { errors },
   } = useForm<CreateListingFormData>({
      defaultValues: {
         categories: [],
         accomodation: "",
         price: 0,
         title: "",
         description: "",
         highlight: "",
         streetAddress: "",
         apartmentSuite: "",
         city: "",
         country: "",
         pinCode: "",
         facilities: [],
         images: [],
         guests: 1,
         bedrooms: 1,
         beds: 1,
         bathrooms: 1,
      },
   });

   // Select Category
   const selectedCategories = watch("categories", []);
   const handleCategorySelection = (category: string) => {
      const updatedCategories = selectedCategories.includes(category)
         ? selectedCategories.filter((cat) => cat !== category)
         : [...selectedCategories, category];
      setValue("categories", updatedCategories);
   };

   // Select Accomodation
   const selectedAccomodation = watch("accomodation", "");
   const handleAccomodationSelection = (accomodation: string) => {
      setValue("accomodation", accomodation);
   };

   // Select Facilities
   const selectedFacilities = watch("facilities", []);
   const handleFacilitySelection = (facility: string) => {
      const updatedFacilities = selectedFacilities.includes(facility)
         ? selectedFacilities.filter((fac) => fac !== facility)
         : [...selectedFacilities, facility];
      setValue("facilities", updatedFacilities);
   };

   // Upload Images
   const uploadedImages = Array.from(watch("images") || []);
   const handleImageRemoval = (index: number) => {
      const updatedImages = uploadedImages.filter((_, i) => i !== index);
      setValue("images", updatedImages);
   };

   // information about place
   const handleIncrement = (field: keyof CreateListingFormData) => {
      console.log(Number(watch(field)));
      setValue(field, Number(watch(field)) + 1);
   };
   const handleDecrement = (field: keyof CreateListingFormData) => {
      setValue(field, Math.max(Number(watch(field)) - 1, 0));
   };

   const onSubmit: SubmitHandler<CreateListingFormData> = (data) => {
      console.log(data);
   };

   useEffect(() => {
      register("categories", {
         validate: (value) => {
            return value?.length > 0 || "Please select at least one category";
         },
      });
      register("accomodation", {
         validate: (value) => {
            return value?.length > 0 || "Please select an accomodation type";
         },
      });
      register("facilities", {
         validate: (value) => {
            return value?.length > 0 || "Please select at least one facility";
         },
      });
      register("images", {
         validate: (value) => {
            return value?.length > 0 || "Please upload at least one image";
         },
      });
   }, [register]);

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
                  {errors.categories && (
                     <span className="text-red-500">{errors.categories.message}</span>
                  )}
                  {/* <div className="flex flex-wrap gap-x-6 gap-y-12 pt-5 justify-center md:px-20">
                     {categories.map((category) => {
                        const { label, icon: Icon } = category;
                        const isSelected = selectedCategories.includes(label);
                        return (
                           <div
                              onClick={() => handleCategorySelection(label)}
                              key={label}
                              className={`w-full max-w-32 h-24 rounded-md shadow-md border ${
                                 isSelected
                                    ? "border-blue-500 border-2 bg-blue-50"
                                    : "border-gray-300"
                              } p-5 grid place-items-center gap-3`}>
                              <Icon />
                              <p className="text-sm text-center">{label}</p>
                           </div>
                        );
                     })}
                  </div> */}
                  <ListingCategories
                     categories={categories}
                     selectedCategories={selectedCategories}
                     handleClick={handleCategorySelection}
                  />
               </article>
               {/* Type of place */}
               <article className="pt-10">
                  <h2 className="font-semibold text-lg text-primary-content">
                     What type of accomodation will you be providing ?
                  </h2>
                  {errors.accomodation && (
                     <span className=" text-red-500">{errors.accomodation.message}</span>
                  )}
                  <div className="space-y-5 md:px-20 pt-10">
                     {placeTypes.map((item) => {
                        const { name, value, description, icon: Icon } = item;
                        const isSelected = selectedAccomodation === value;
                        return (
                           <div
                              key={name}
                              onClick={() => handleAccomodationSelection(value)}
                              className={`cursor-pointer w-full shadow-md rounded-md flex border items-center justify-between p-5 ${
                                 isSelected ? "border-blue-500 border-2 bg-blue-50" : ""
                              }`}>
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
               {/* Place Details */}
               <article className="pt-10">
                  <h2 className="font-semibold text-lg text-primary-content">
                     Please specify details about your page
                  </h2>
                  <div className="md:px-20 pt-10 space-y-5">
                     <section>
                        <label htmlFor="price" className="font-semibold">
                           Price (₹)
                        </label>

                        <input
                           className="w-full px-4 py-2 border border-gray-300 rounded shadow-md"
                           type="number"
                           id="price"
                           {...register("price", {
                              required: "Price is required",
                              validate: (value) => {
                                 const isValidPrice = /^\d+$/.test(value.toString());
                                 if (!isValidPrice) return "Please enter a valid price";
                                 const numericPrice = Number(value);
                                 if (numericPrice < 1000 || numericPrice > 1000000)
                                    return "Please enter a price between 1000 and 1000000";
                                 return true;
                              },
                           })}
                        />
                        {errors.price && (
                           <span className="text-xs text-red-500">{errors.price.message}</span>
                        )}
                     </section>
                     <section>
                        <label htmlFor="title" className="font-semibold">
                           Title
                        </label>
                        <input
                           className="w-full px-4 py-2 border border-gray-300 rounded shadow-md"
                           type="text"
                           id="title"
                           {...register("title", {
                              required: "Title is required",
                              minLength: {
                                 value: 1,
                                 message: "Title must be at least 1 character",
                              },
                              maxLength: {
                                 value: 100,
                                 message: "Title cannot exceed 100 characters",
                              },
                           })}
                        />
                        {errors.title && (
                           <span className="text-xs text-red-500">{errors.title.message}</span>
                        )}
                     </section>
                     <section>
                        <label htmlFor="title" className="font-semibold">
                           Description
                        </label>
                        <textarea
                           className="w-full px-4 py-2 border border-gray-300 rounded shadow-md"
                           id="description"
                           {...register("description", {
                              required: "description is required",
                              minLength: {
                                 value: 1,
                                 message: "description must be at least 1 character",
                              },
                              maxLength: {
                                 value: 100,
                                 message: "description cannot exceed 250 characters",
                              },
                           })}
                        />
                        {errors.description && (
                           <span className="text-xs text-red-500">
                              {errors.description.message}
                           </span>
                        )}
                     </section>
                     <section>
                        <label htmlFor="highlight" className="font-semibold">
                           Highligts about your place
                        </label>
                        <input
                           className="w-full px-4 py-2 border border-gray-300 rounded shadow-md"
                           type="text"
                           id="highlight"
                           {...register("highlight", {
                              required: "highlight is required",
                              minLength: {
                                 value: 1,
                                 message: "highlight must be at least 1 character",
                              },
                              maxLength: {
                                 value: 100,
                                 message: "highlight cannot exceed 150 characters",
                              },
                           })}
                        />
                        {errors.highlight && (
                           <span className="text-xs text-red-500">{errors.highlight.message}</span>
                        )}
                     </section>
                     <section>
                        <label htmlFor="streetAddress" className="font-semibold">
                           Street Address
                        </label>
                        <input
                           className="w-full px-4 py-2 border border-gray-300 rounded shadow-md"
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
                        {errors.streetAddress && (
                           <span className="text-xs text-red-500">
                              {errors.streetAddress.message}
                           </span>
                        )}
                     </section>
                     <section className="flex flex-col md:flex-row md:gap-10">
                        <div className="flex-1">
                           <label htmlFor="apartmentSuite" className="font-semibold">
                              Apartment / Suite
                           </label>
                           <input
                              className="w-full px-4 py-2 border border-gray-300 rounded shadow-md"
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
                           {errors.apartmentSuite && (
                              <span className="text-xs text-red-500">
                                 {errors.apartmentSuite.message}
                              </span>
                           )}
                        </div>
                        <div className="flex-1">
                           <label htmlFor="city" className="font-semibold">
                              City
                           </label>
                           <input
                              className="w-full px-4 py-2 border border-gray-300 rounded shadow-md"
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
                           {errors.city && (
                              <span className="text-xs text-red-500">{errors.city.message}</span>
                           )}
                        </div>
                     </section>
                     <section className="flex flex-col md:flex-row md:gap-10">
                        <div className="flex-1">
                           <label htmlFor="country" className="font-semibold">
                              Country
                           </label>
                           <input
                              className="w-full px-4 py-2 border border-gray-300 rounded shadow-md"
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
                           {errors.country && (
                              <span className="text-xs text-red-500">{errors.country.message}</span>
                           )}
                        </div>
                        <div className="flex-1">
                           <label htmlFor="pinCode" className="font-semibold">
                              PIN Code
                           </label>
                           <input
                              className="w-full px-4 py-2 border border-gray-300 rounded shadow-md"
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
                           {errors.pinCode && (
                              <span className="text-xs text-red-500">{errors.pinCode.message}</span>
                           )}
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
                     <CartBtn
                        title="Guests"
                        value={watch("guests")}
                        onIncrement={() => handleIncrement("guests")}
                        onDecrement={() => {
                           handleDecrement("guests");
                        }}
                     />
                     <CartBtn
                        title="Bedrooms"
                        value={watch("bedrooms")}
                        onIncrement={() => {
                           handleIncrement("bedrooms");
                        }}
                        onDecrement={() => {
                           handleDecrement("bedrooms");
                        }}
                     />
                     <CartBtn
                        title="Beds"
                        value={watch("beds")}
                        onIncrement={() => {
                           handleIncrement("beds");
                        }}
                        onDecrement={() => {
                           handleDecrement("beds");
                        }}
                     />
                     <CartBtn
                        title="bathroom"
                        value={watch("bathrooms")}
                        onIncrement={() => {
                           handleIncrement("bathrooms");
                        }}
                        onDecrement={() => {
                           handleDecrement("bathrooms");
                        }}
                     />
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
                  {errors.facilities && (
                     <span className="text-red-500">{errors.facilities.message}</span>
                  )}
                  <div className="md:px-20 pt-10 flex flex-wrap justify-center gap-5">
                     {facilities.map((item) => {
                        const { name, value, icon: Icon } = item;
                        const isSelected = selectedFacilities.includes(value);
                        return (
                           <div
                              key={name}
                              onClick={() => handleFacilitySelection(value)}
                              className={`max-w-52 w-full flex flex-col items-center justify-center gap-2 p-5 rounded-md shadow-md border ${
                                 isSelected
                                    ? "border-blue-500 border-2 bg-blue-50"
                                    : "border-gray-300"
                              }`}>
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
                  {errors.images && <span className="text-red-500">{errors.images.message}</span>}
                  <div className=" md:px-20 pt-10">
                     {/* If there are photos display the upoload file Input field*/}
                     {uploadedImages.length < 1 && (
                        <>
                           <input
                              id="img"
                              className="hidden "
                              type="file"
                              multiple
                              accept="image/*"
                              {...register("images")}
                           />
                           <label
                              htmlFor="img"
                              className="mx-auto w-full md:w-96 h-48 rounded-md shadow-md border-dashed border-2 border-gray-300 flex flex-col justify-center items-center md:text-lg font-semibold">
                              <UploadCloud size={32} />
                              UPLOAD PHOTOS
                           </label>
                        </>
                     )}
                     {/* display photos*/}
                     {uploadedImages.length >= 1 && (
                        <>
                           <input
                              id="img2"
                              className="hidden"
                              type="file"
                              multiple
                              accept="image/*"
                              {...register("images")}
                           />

                           <div className="flex flex-wrap gap-5 ">
                              {uploadedImages.map((image: File, index: number) => (
                                 <div key={index} className="relative md:max-w-48 ">
                                    <img
                                       className="w-full h-full object-cover rounded-md"
                                       src={URL.createObjectURL(image)}
                                       alt={`Uploaded Image ${index}`}
                                    />
                                    <button
                                       type="button"
                                       className="absolute top-2 right-2 btn btn-xs btn-error"
                                       onClick={() => handleImageRemoval(index)}>
                                       <Trash size={16} />
                                    </button>
                                 </div>
                              ))}
                           </div>
                           <span className="italic underline text-red-600 text-sm ">
                              NOTE : new image selection will be overrided{" "}
                           </span>
                           <label
                              htmlFor="img"
                              className="mx-auto w-full md:w-96 h-48 rounded-md shadow-md border-dashed border-2 border-gray-300 flex flex-col justify-center items-center text-lg font-semibold">
                              <UploadCloud size={32} />
                              UPLOAD PHOTOS
                           </label>
                        </>
                     )}
                  </div>
               </article>
            </section>
            <div className="w-full flex justify-center mb-20">
               <button className="btn btn-primary btn-wide btn-lg">PUBLISH</button>
            </div>
         </form>
      </main>
   );
};

export default CreateListingPage;