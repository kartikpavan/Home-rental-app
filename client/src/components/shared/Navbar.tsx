import { Link, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { presistor } from "../../redux/store";

// temp var
let user = false;
const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    presistor.purge();
    navigate("/login");
  };
  return (
    <nav className="w-full shadow-md fixed bg-white">
      {/* logo */}
      <div className="px-3 md:container mx-auto py-5 flex items-center justify-between">
        <Link to="/" className="text-2xl md:text-4xl">
          Dream <span className="text-primary font-bold">NEST</span>
        </Link>
        {/* Search Bar */}
        <div className="relative hidden md:flex ">
          <Search className="absolute top-[50%] left-2 -translate-y-[50%] text-gray-400 " />
          <input
            type="text"
            className="input input-bordered w-80 pl-10 rounded-md"
            placeholder="Search..."
          />
        </div>
        {/* Pofile Pic */}
        <button className="btn btn-error" onClick={handleLogout}>
          RESET State{" "}
        </button>
        <Link
          to={`${user ? "/create-listing" : "/auth/login"}`}
          className="text-primary font-semibold text-lg">
          Become a Host
        </Link>
        {user ? <div></div> : <div></div>}
      </div>
    </nav>
  );
};

export default Navbar;
