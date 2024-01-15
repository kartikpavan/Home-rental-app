import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { RegisterFormData } from "../types";
import toast, { Toaster } from "react-hot-toast";

const RegisterPage = () => {
   const navigate = useNavigate();
   const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
   } = useForm<RegisterFormData>();
   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

   const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
      try {
         setIsSubmitting(true);
         // send data to server
         const formData = new FormData();
         // Short hand below
         // Object.keys(data).forEach((key) => {
         //   if (key === 'profilePic') {
         //     formData.append(key, data[key][0]);
         //   } else {
         //     formData.append(key, data[key] as string);
         //   }
         // })
         formData.append("firstName", data.firstName);
         formData.append("lastName", data.lastName);
         formData.append("email", data.email);
         formData.append("password", data.password);
         formData.append("profilePic", data.profilePic[0]);
         const response = await fetch("http://localhost:5000/api/auth/register", {
            method: "POST",
            body: formData,
         });
         if (response.ok) {
            console.log("Registered successfully!");
            navigate("/login", { replace: true });
            toast.success("Registered successfully, Please Login again..");
         } else {
            const errorMessage = await response.json();
            console.error("Registration Failed " + errorMessage.message);
            toast.error("Registeration Failed, Check Console");
         }
      } catch (error) {
         console.log("Registeration Failed " + error.message);
         toast.error("Registeration Failed");
      } finally {
         setIsSubmitting(false);
      }
   };

   return (
      <>
         <Toaster />
         <div className="hero-bg w-screen h-screen flex items-center justify-center">
            <div className="container mx-auto flex flex-col md:flex-row">
               <div className="hidden md:flex w-1/2 bg-cover bg-center">
                  <img src="/images/login.png" className="h-full" alt="Background" />
               </div>
               <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-8 py-10">
                  <h1 className="text-primary text-3xl font-bold mb-3">Welcome to Dream HARBOR</h1>
                  <h2 className="text-xl font-bold mb-6">Create an Account</h2>
                  <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                     <div className="mb-4">
                        <input
                           type="text"
                           placeholder="First Name"
                           className="w-full px-4 py-2 border border-gray-300 rounded"
                           {...register("firstName", {
                              required: "First Name is Required",
                              minLength: {
                                 value: 1,
                                 message: "First Name must be at least 1 characters",
                              },
                              maxLength: {
                                 value: 20,
                                 message: "First Name must be less than 20 characters",
                              },
                           })}
                        />
                        {errors.firstName && (
                           <span className="text-red-600 text-xs">{errors.firstName.message}</span>
                        )}
                     </div>
                     <div className="mb-4 ">
                        <input
                           type="text"
                           placeholder="Last Name"
                           className="w-full px-4 py-2 border border-gray-300 rounded"
                           {...register("lastName", {
                              required: "Last Name is Required",
                              minLength: {
                                 value: 1,
                                 message: "Last Name must be at least 1 characters",
                              },
                              maxLength: {
                                 value: 20,
                                 message: "Last Name must be less than 0 characters",
                              },
                           })}
                        />
                        {errors.lastName && (
                           <span className="text-red-600 text-sm ">{errors.lastName.message}</span>
                        )}
                     </div>
                     <div className=" mb-4 ">
                        <input
                           type="email"
                           placeholder="Email"
                           className="w-full px-4 py-2 border border-gray-300 rounded"
                           {...register("email", {
                              required: "Email is Required",
                           })}
                        />
                        {errors.email && (
                           <span className="text-red-600 text-xs">{errors.email.message}</span>
                        )}
                     </div>
                     <div className=" mb-4 ">
                        <input
                           type="password"
                           placeholder="Password"
                           className="w-full px-4 py-2 border border-gray-300 rounded"
                           {...register("password", {
                              required: "Password is Required",
                              minLength: {
                                 value: 6,
                                 message: "Password must be at least 6 characters",
                              },
                           })}
                        />
                        {errors.password && (
                           <span className="text-red-600 text-xs">{errors.password.message}</span>
                        )}
                     </div>
                     <div className=" mb-4 ">
                        <input
                           type="password"
                           placeholder="Re-enter Password"
                           className="w-full px-4 py-2 border border-gray-300 rounded"
                           {...register("confirmPassword", {
                              validate: (value) => {
                                 if (!value) return "This field is required";
                                 else if (value !== watch("password"))
                                    return "Passwords do not match";
                              },
                           })}
                        />
                        {errors.confirmPassword && (
                           <span className="text-red-600 text-xs ">
                              {errors.confirmPassword.message}
                           </span>
                        )}
                     </div>
                     <div className="mb-4">
                        <input
                           type="file"
                           accept="image/*"
                           placeholder="Upload Profile Picture"
                           className="file-input file-input-bordered block file-input-primary w-full max-w-xs"
                           {...register("profilePic", {
                              required: "Please upload a profile picture",
                           })}
                        />
                        {errors.profilePic && (
                           <span className="text-red-600 text-xs">{errors.profilePic.message}</span>
                        )}
                     </div>
                     <p className="text-sm py-2">
                        Already have an account ?{" "}
                        <Link to="/login" className="font-semibold italic underline">
                           Sign In here
                        </Link>
                     </p>
                     <button
                        type="submit"
                        className="btn btn-primary w-full"
                        disabled={isSubmitting}>
                        {isSubmitting && (
                           <span className="loading loading-spinner loading-md"></span>
                        )}
                        Submit
                     </button>
                  </form>
               </div>
            </div>
         </div>
      </>
   );
};

export default RegisterPage;
