import { LucideIcon } from "lucide-react";
type Props = {
   categories: Array<{ label: string; icon: LucideIcon; description?: string; img?: string }>;
   selectedCategories: string[];
   handleClick: (label: string) => void;
};

const ListingCategories = ({ categories, selectedCategories, handleClick }: Props) => {
   return (
      <div className="flex flex-wrap gap-x-6 gap-y-12 pt-5 justify-center md:px-20">
         {categories.map((category) => {
            const { label, icon: Icon } = category;
            const isSelected = selectedCategories.includes(label);
            return (
               <div
                  onClick={() => handleClick(label)}
                  key={label}
                  className={`w-full max-w-32 h-24 rounded-md shadow-md border ${
                     isSelected ? "border-blue-500 border-2 bg-blue-50" : "border-gray-300"
                  } p-5 grid place-items-center gap-3`}>
                  <Icon />
                  <p className="text-sm text-center">{label}</p>
               </div>
            );
         })}
      </div>
   );
};

export default ListingCategories;
