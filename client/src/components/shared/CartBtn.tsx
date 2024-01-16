import { MinusCircle, PlusCircle } from "lucide-react";

type Props = {
   title: string;
};

const CartBtn = ({ title }: Props) => {
   return (
      <div className="w-full max-w-52 p-5 flex justify-between items-center border shadow-md rounded-md">
         <h1>{title}</h1>
         <div className="flex gap-2 items-center">
            <MinusCircle /> <p>1</p> <PlusCircle />
         </div>
      </div>
   );
};

export default CartBtn;
