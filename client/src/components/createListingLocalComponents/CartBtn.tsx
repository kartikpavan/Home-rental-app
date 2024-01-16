import { MinusCircle, PlusCircle } from "lucide-react";

type Props = {
   title: string;
   value: number;
   onIncrement: () => void;
   onDecrement: () => void;
};

const CartBtn = ({ title, value, onDecrement, onIncrement }: Props) => {
   return (
      <div className="w-full max-w-52 p-5 flex justify-between items-center border shadow-md rounded-md">
         <h1>{title}</h1>
         <div className="flex gap-2 items-center">
            <MinusCircle onClick={onDecrement} />
            <p>{value}</p>
            <PlusCircle onClick={onIncrement} className="cursor-pointer" />
         </div>
      </div>
   );
};

export default CartBtn;
