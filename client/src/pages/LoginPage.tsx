import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoginFormData } from "../types";
import { setLogin } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { API_URL } from "../api/apiClient";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onSubmit: SubmitHandler<LoginFormData> = async (formData) => {
    try {
      setIsSubmitting(true);
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.status === 404) {
        setError("email", {
          message: "User not found",
        });
      }
      const loggedInUser = await response.json();
      if (loggedInUser.message === "Invalid credentials") {
        toast.error("Invalid Credentials");
      } else if (loggedInUser.message === "Login successful") {
        dispatch(
          setLogin({
            user: loggedInUser.data,
            token: loggedInUser.token,
          })
        );
        toast.success("Login Successful");
        navigate("/");
      }
    } catch (error) {
      console.log("Registeration Failed " + error.message);
      toast.error("Login Failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toaster />
      <div className="main-bg w-screen h-screen flex items-center justify-center">
        <div className="container mx-auto flex flex-col md:flex-row">
          <div className="hidden md:flex w-1/2 bg-cover bg-center">
            <img src="/images/loginHero.jpg" className="h-full" alt="Background" />
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-8 py-10">
            <h1 className="text-primary text-3xl font-bold mb-3">Welcome to Dream HARBOR</h1>
            <h2 className="text-xl font-bold mb-6">Sign In to your Account</h2>
            <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
              </div>
              <div className="mb-4">
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
              <p className="text-sm py-2">
                Don't have an account ?{" "}
                <Link to="/register" className="font-semibold italic underline">
                  Sign Up here
                </Link>
              </p>
              <button type="submit" className="btn btn-primary w-full" disabled={isSubmitting}>
                {isSubmitting && <span className="loading loading-spinner loading-md"></span>}
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
