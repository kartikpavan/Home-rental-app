import { LucideIcon } from "lucide-react";

type Props = {
  placeTypes: Array<{ name: string; value: string; icon: LucideIcon; description: string }>;
  selectedAccomodation: string;
  handleClick: (accomodation: string) => void;
};

const ListingAccomodation = ({ placeTypes, selectedAccomodation, handleClick }: Props) => {
  return (
    <div className="space-y-5 md:px-20 pt-10">
      {placeTypes.map((item) => {
        const { name, value, description, icon: Icon } = item;
        const isSelected = selectedAccomodation === name;
        return (
          <div
            key={name}
            onClick={() => handleClick(name)}
            className={`cursor-pointer w-full shadow-md rounded-md flex border items-center justify-between p-5 ${
              isSelected ? "border-blue-500 border-2 bg-blue-50" : ""
            }`}>
            <div className="flex flex-col gap-5">
              <p className="font-semibold">{name}</p>
              <p className="text-sm">{description}</p>
            </div>
            <Icon className="hidden sm:flex" />
          </div>
        );
      })}
    </div>
  );
};

export default ListingAccomodation;
