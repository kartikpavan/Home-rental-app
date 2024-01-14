import { Link, useNavigate } from "react-router-dom";
import { CircleUserRound, Menu, Search, User } from "lucide-react";
import { RootState, presistor } from "../../redux/store";
import { useSelector } from "react-redux";
import { NavMenuItems } from "../../utils/data";

// temp var
const Navbar = () => {
   const navigate = useNavigate();
   const user = useSelector((store: RootState) => store.user);

   // LOGOUT USER and clear the redux persist state
   const handleLogout = () => {
      presistor.purge();
      navigate("/login");
   };
   return (
      <nav className="w-full shadow-md fixed bg-white">
         {/* logo */}
         <div className="px-3 md:container mx-auto py-3 flex items-center justify-between">
            <Link to="/" className="text-xl md:text-3xl">
               Dream <span className="text-primary font-bold">NEST</span>
            </Link>
            {/* Search Bar */}
            <div className="relative hidden md:flex ">
               <Search className="absolute top-[50%] left-2 -translate-y-[50%] text-gray-400 " />
               <input
                  type="text"
                  className="input input-bordered input-sm w-80 pl-10 roued-md"
                  placeholder="Search..."
               />
            </div>
            {/* Pofile Pic */}
            <div className="flex gap-3 items-center">
               <Link
                  to={`${user ? "/create-listing" : "/login"}`}
                  className="text-primary font-semibold text-lg hidden md:flex">
                  Become a Host
               </Link>
               {user ? (
                  <div className="border p-1 rounded-full flex items-center gap-3 flex-row-reverse hover:shadow-md">
                     <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="m-1">
                           <Menu />
                        </div>
                        <ul
                           tabIndex={0}
                           className="dropdown-content z-[1] menu p-2 shadow-md bg-base-100 rounded-md w-52 mt-4 ">
                           {NavMenuItems.map((item) => {
                              return (
                                 <Link
                                    to={item.href}
                                    className="w-full py-2 md:text-[16px] text-primary-content hover:text-primary">
                                    {item.label}
                                 </Link>
                              );
                           })}
                           <li
                              onClick={handleLogout}
                              className="text-error font-semibold md:text-[16px] py-2 cursor-pointer">
                              LOG OUT
                           </li>
                        </ul>
                     </div>
                     <img
                        src={user.profileImage.url}
                        alt="ProfilePic"
                        className="object-contain w-8 h-8 rounded-full hover:cursor-pointer"
                     />
                  </div>
               ) : (
                  <div className="border p-1 rounded-full flex items-center gap-3 flex-row-reverse">
                     <Menu />
                     <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="m-1">
                           <CircleUserRound className="object-contain" />
                        </div>
                        <ul
                           tabIndex={0}
                           className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-md w-52 mt-4">
                           <Link
                              to={"/login"}
                              className="w-full font-semibold py-2 text-primary-content  hover:text-primary ">
                              Log In
                           </Link>
                           <Link
                              to={"/register"}
                              className="w-full font-semibold py-2 text-primary-content  hover:text-primary ">
                              Sign Up
                           </Link>
                        </ul>
                     </div>
                  </div>
               )}
            </div>
         </div>
      </nav>
   );
};

export default Navbar;
