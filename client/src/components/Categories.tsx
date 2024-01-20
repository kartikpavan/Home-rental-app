import { categories } from "../utils/data";
import CategoryCard from "./shared/CategoryCard";

const Categories = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-primary-content text-center my-10 ">
        Explore Top Categories
      </h1>
      <p className="text-gray-700 mx-auto max-w-xl w-full text-center leading-6 tracking-wide text-lg my-10">
        Explore wide range of vacation rentals that cater to all types of travellers. Immerse
        yourself in the local culture, enjoy the comfort of home, and create unforgettable memories
        in your dream destination.
      </p>
      <section className="px-3 md:container mx-auto flex gap-5 flex-wrap justify-center my-10">
        {categories.slice(1, 7).map((category) => {
          return (
            <CategoryCard
              label={category.label}
              Icon={category.icon}
              key={category.label}
              description={category.description}
              img={category.img}
            />
          );
        })}
      </section>
    </div>
  );
};

export default Categories;
