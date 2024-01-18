import { useParams } from "react-router-dom";

const ListingDetailPage = () => {
   const { id: listingId } = useParams();
   return <main className="px-3 md:container mx-auto pt-20">{listingId}</main>;
};

export default ListingDetailPage;
