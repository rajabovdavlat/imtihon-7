import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openOrderModal } from "../store/uiSlice";

export default function CartSidebar() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className='w-80 bg-white p-6 shadow-lg'>
      <h2 className='text-xl font-bold mb-4'>Your Cart ({items.length})</h2>

    

      <div className='mt-4 font-bold text-lg'>
        Total: ${totalPrice.toFixed(2)}
      </div>

      <button
        onClick={() => dispatch(openOrderModal())}
        className='mt-4 bg-orange-600 text-white py-3 px-6 rounded-full w-full hover:bg-orange-700'
      >
        Confirm Order
      </button>
    </div>
  );
}
