import { LucideIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface Props {
   label: string;
   Icon: LucideIcon;
   img?: string;
   description?: string;
}

const CategoryCard = ({ label, Icon, description, img }: Props) => {
   const [isHovered, setIsHovered] = useState<boolean>(false);

   const handleMouseEnter = () => {
      setIsHovered(true);
   };

   const handleMouseLeave = () => {
      setIsHovered(false);
   };
   return (
      <Link
         to={`/category/${label}`}
         className="relative max-w-56 w-full h-48 overflow-hidden rounded-md shadow-lg cursor-pointer	"
         onMouseEnter={handleMouseEnter}
         onMouseLeave={handleMouseLeave}>
         <div
            className="bg-cover bg-center h-full relative overflow-hidden"
            style={{
               backgroundImage: `url(${img})`,
            }}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div
               className={`absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4 transition-opacity duration-500 ${
                  isHovered ? "opacity-0" : "opacity-100"
               }`}>
               <div className="grid place-items-center  gap-4">
                  <Icon />
                  <h3 className="text-2xl font-bold">{label}</h3>
               </div>
            </div>
            <div
               className={`absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4 transition-opacity duration-500 ${
                  isHovered ? "opacity-100" : "opacity-0"
               }`}>
               <p className="text-sm sm:text-lg mt-2">{description}</p>
            </div>
         </div>
      </Link>
   );
};

export default CategoryCard;
