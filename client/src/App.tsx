import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./components/shared/Navbar";
import CreateListingPage from "./pages/CreateListingPage";
import ListingDetailPage from "./pages/ListingDetailPage";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import MyTripsPage from "./pages/MyTripsPage";

const App = () => {
  const { token } = useSelector((store: RootState) => store.user);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/create-listing" element={!token ? <LoginPage /> : <CreateListingPage />} />
        <Route path="/listing/:id" element={<ListingDetailPage />} />
        <Route path="/:userId/trips" element={<MyTripsPage />} />

        <Route path="/auth/*" element={<h1 className="pt-40">This route does not exist yet</h1>} />
        <Route path="/*" element={<h1 className="pt-40">This route does not exist yet</h1>} />
      </Routes>
    </>
  );
};

export default App;
