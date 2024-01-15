import { Link } from "react-router-dom";

const Hero = () => {
   return (
      <div className="main-bg h-screen flex items-center justify-center px-3	">
         <div className="text-center text-primary">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Find Your Dream Home</h1>
            <p className="text-lg md:text-xl mb-8 text-primary-content">
               Welcome Home ! Anywhere you roam. Stay in the moment. Make your memories
            </p>
            <Link
               to={"/create-listing"}
               className="bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
               Get Started
            </Link>
         </div>
      </div>
   );
};

export default Hero;
