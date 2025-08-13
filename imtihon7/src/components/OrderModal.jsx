import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeOrderModal } from "../store/uiSlice";
import { useFetch } from "../hooks/useFetch";

export default function OrderModal() {
  const dispatch = useDispatch();
  const { data } = useFetch(
    "https://json-api.uz/api/project/dessertss/desserts"
  );
  const cart = useSelector((state) => state.cart);
  const isOpen = useSelector((state) => state.ui.isOrderModalOpen);

  if (!isOpen) return null;

  const cartItems = data ? data.data.filter((item) => cart[item.id]) : [];

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * cart[item.id],
    0
  );

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-2xl p-6 w-[400px] shadow-lg'>
        <h2 className='text-2xl font-bold mb-4 text-[#260F08]'>
          Order Confirmed 
        </h2>
        <p className='text-gray-600 mb-6'>We hope you enjoy your food!</p>

        <div className='bg-[#fdf5f3] rounded-lg p-4 mb-4'>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className='flex justify-between items-center border-b border-gray-200 py-2'
            >
              <div>
                <p className='font-semibold text-[#260F08]'>{item.name}</p>
                <div className='flex items-center gap-1 text-sm'>
                  <span className='text-[#C73B0F] font-bold'>
                    {cart[item.id]}x
                  </span>
                  <span className='text-gray-500'>
                    @ ${item.price.toFixed(2)}
                  </span>
                </div>
              </div>
              <span className='text-[#260F08] font-semibold'>
                ${(item.price * cart[item.id]).toFixed(2)}
              </span>
            </div>
          ))}

          <div className='flex justify-between items-center mt-4 font-bold text-lg'>
            <span>Order Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={() => dispatch(closeOrderModal())}
          className='w-full bg-[#C73B0F] hover:bg-[#a4300d] text-white px-4 py-2 rounded-full transition'
        >
          Start New Order
        </button>
      </div>
    </div>
  );
}
