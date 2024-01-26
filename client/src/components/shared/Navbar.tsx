import { Link, useNavigate } from "react-router-dom";
import { CircleUserRound, Menu, Search } from "lucide-react";
import { RootState, presistor } from "../../redux/store";
import { useSelector } from "react-redux";
import { NavMenuItems } from "../../utils/data";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store: RootState) => store.user);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearchAction = (
    event:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<SVGElement, MouseEvent>
  ) => {
    if (searchTerm.trim() === "") return;
    if (
      (event as React.KeyboardEvent<HTMLInputElement>).key === "Enter" ||
      (event as React.MouseEvent<SVGElement, MouseEvent>).type === "click"
    ) {
      navigate(`/listing/search/${searchTerm}`);
      setSearchTerm("");
    }
  };

  // LOGOUT USER and clear the redux persist state
  const handleLogout = () => {
    presistor.purge();
    navigate("/login");
  };

  return (
    <nav className="w-full shadow-md fixed bg-white z-10">
      {/* logo */}
      <div className="px-3 md:container mx-auto py-3 flex items-center justify-between">
        <Link to="/" className="text-xl md:text-2xl">
          Dream <span className="text-primary font-bold">HARBOR</span>
        </Link>
        {/* Search Bar */}
        <div className="relative hidden md:flex">
          <Search
            className="absolute top-[50%] left-2 -translate-y-[50%] text-gray-400 cursor-pointer"
            onClick={handleSearchAction}
          />
          <input
            id="searchInput"
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
            onKeyDown={handleSearchAction}
            type="Search ..."
            className="input input-bordered input-sm w-80 pl-10 rounded-md"
            placeholder="Search..."
          />
        </div>
        {/* Pofile Pic */}
        <div className="flex gap-3 items-center">
          <div
            // to={`${user ? "/create-listing" : "/login"}`}
            className="text-primary font-semibold hidden md:flex">
            {user && (
              <h1>
                Welcome <span className="text-error">{user.firstName}</span>
              </h1>
            )}
          </div>
          {user ? (
            <div className="border p-1 rounded-full flex items-center gap-3 flex-row-reverse hover:shadow-md">
              <div className="dropdown dropdown-end bg-white z-50 ">
                <div tabIndex={0} role="button" className="m-1">
                  <Menu />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-50 menu p-2 shadow-md bg-base-100 rounded-md w-52 mt-4 ">
                  {NavMenuItems.map((item) => {
                    if (item.href === "trips") {
                      item.href = `/${user._id}/trips`;
                    } else if (item.href === "wishlist") {
                      item.href = `/${user._id}/wishlist`;
                    } else if (item.href === "listings") {
                      item.href = `/${user._id}/listings`;
                    }
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
                src={user.profileImage?.url}
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
