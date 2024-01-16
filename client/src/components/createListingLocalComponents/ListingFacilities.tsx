import { LucideIcon } from "lucide-react";

type Props = {
   facilities: Array<{ name: string; value: string; icon: LucideIcon }>;
   selectedFacilities: string[];
   handleClick: (facility: string) => void;
};
const ListingFacilities = ({ facilities, selectedFacilities, handleClick }: Props) => {
   return (
      <div className="md:px-20 pt-10 flex flex-wrap justify-center gap-5">
         {facilities.map((item) => {
            const { name, value, icon: Icon } = item;
            const isSelected = selectedFacilities.includes(value);
            return (
               <div
                  key={name}
                  onClick={() => handleClick(value)}
                  className={`max-w-52 w-full flex flex-col items-center justify-center gap-2 p-5 rounded-md shadow-md border ${
                     isSelected ? "border-blue-500 border-2 bg-blue-50" : "border-gray-300"
                  }`}>
                  <Icon />
                  <p className="text-center">{name}</p>
               </div>
            );
         })}
      </div>
   );
};

export default ListingFacilities;
