import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import Navbar from "./components/shared/Navbar";
import {
  HomePage,
  LoginPage,
  RegisterPage,
  CategoryPage,
  MyListingsPage,
  MyWishListPage,
  MyTripsPage,
  CreateListingPage,
  ListingDetailPage,
  SearchResultsPage,
  NotFoundPage,
} from "./pages";

const App = () => {
  const { token } = useSelector((store: RootState) => store.user);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/create-listing"
          element={!token ? <LoginPage /> : <CreateListingPage />}
        />
        <Route path="/listing/:id" element={<ListingDetailPage />} />
        <Route
          path="/listing/categories/:category"
          element={<CategoryPage />}
        />
        <Route
          path="/listing/search/:searchQuery"
          element={<SearchResultsPage />}
        />
        <Route
          path="/:userId/trips"
          element={!token ? <LoginPage /> : <MyTripsPage />}
        />
        <Route
          path="/:userId/wishlist"
          element={!token ? <LoginPage /> : <MyWishListPage />}
        />
        <Route
          path="/:userId/listings"
          element={!token ? <LoginPage /> : <MyListingsPage />}
        />
        <Route path="/auth/*" element={<NotFoundPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
