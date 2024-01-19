import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import ListingCard from "../components/shared/ListingCard";

const MyWishListPage = () => {
  const { user } = useSelector((store: RootState) => store.user);

  console.log(user?.wishList);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "My Wishlist -  Dream Harbor";
  }, []);

  return (
    <>
      <main className="main-bg w-full h-screen">
        <section className="px-3 md:container mx-auto pt-20 pb-20 ">
          <h1 className="text-2xl font-semibold">My WishList</h1>
          <section className="px-3 md:container mx-auto pt-10 pb-20 flex gap-x-10 gap-y-20 flex-wrap ">
            {user?.wishList?.map((item) => {
              return (
                <ListingCard
                  categories={item.categories}
                  listingId={item._id}
                  title={item.title}
                  accomodation={item.accomodation}
                  images={item.images}
                  price={item.price}
                />
              );
            })}
          </section>
        </section>
      </main>
    </>
  );
};

export default MyWishListPage;
