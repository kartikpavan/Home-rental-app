import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

type Props = {
   listingId: string;
   title: string;
   accomodation: string;
   price: number;
   images: Array<{ url: string; public_id: string }>;
   categories: string[];
};

const ListingCard = ({ listingId, title, accomodation, price, images, categories }: Props) => {
   const [currentIndex, setCurrentIndex] = useState<number>(0);

   const handleLeftClick = (idx: number) => {
      if (idx === 0) {
         setCurrentIndex(images.length - 1);
      } else {
         setCurrentIndex(idx - 1);
      }
   };
   const handleRightClick = (idx: number) => {
      if (idx === images.length - 1) {
         setCurrentIndex(0);
      } else {
         setCurrentIndex(idx + 1);
      }
   };

   return (
      <div className=" max-w-80 w-full h-64">
         {/* image */}
         <div className="w-full h-3/4 relative ">
            <ChevronLeft
               onClick={() => handleLeftClick(currentIndex)}
               className="z-50 cursor-pointer absolute top-1/2 left-2 bg-gray-200 rounded-full"
            />
            <Link to={`/listing/${listingId}`}>
               <img
                  src={images[currentIndex].url}
                  alt="image"
                  className="w-full h-full object-cover rounded-md rounded-b-none"
               />
            </Link>
            <ChevronRight
               onClick={() => handleRightClick(currentIndex)}
               className="z-50 cursor-pointer absolute top-1/2 right-2 bg-gray-200 rounded-full"
            />
         </div>
         {/* other info */}
         <div className="rounded-md rounded-t-none shadow-md border border-t-0 p-2 space-y-2">
            <Link to={`/listing/${listingId}`}>
               <h1 className="font-bold">{title}</h1>
               <div className="flex flex-wrap gap-1">
                  {categories.map((category) => (
                     <p key={category} className="border rounded-full p-1 text-xs text-primary">
                        {category}
                     </p>
                  ))}
               </div>
               <p className="text-gray-500 text-sm">{accomodation}</p>
               <p className="font-bold">
                  ₹ {price} <span className="font-normal text-gray-500">/ night</span>
               </p>
            </Link>
         </div>
      </div>
   );
};

export default ListingCard;
