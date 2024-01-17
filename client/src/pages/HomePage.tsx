import Categories from "../components/Categories";
import Hero from "../components/Hero";
import Listings from "../components/Listings";

const HomePage = () => {
   return (
      <main>
         <Hero />
         <Categories />
         <Listings />
      </main>
   );
};

export default HomePage;
