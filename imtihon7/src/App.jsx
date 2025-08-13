import React from "react";
import { useFetch } from "./hooks/useFetch";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart, deleteFromCart } from "./store/cartSlice";
import { openOrderModal } from "./store/uiSlice";
import OrderModal from "./components/OrderModal";

export default function App() {
  const { data } = useFetch(
    "https://json-api.uz/api/project/dessertss/desserts"
  );
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className='flex flex-col lg:flex-row gap-6 p-4 sm:p-6'>
      {/* Список товаров */}
      <div className='w-full lg:w-2/3'>
        <h2 className='text-2xl sm:text-4xl font-bold mb-6'>Desserts</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6'>
          {data &&
            data.data.map((item) => {
              const quantity = cart[item.id] || 0;
              return (
                <div
                  key={item.id}
                  className='bg-white rounded-2xl shadow p-4 flex flex-col'
                >
                  <div className='relative w-full'>
                    <img
                      src={item.image.desktop}
                      alt={item.name}
                      className='rounded-lg w-full h-auto'
                    />

                    {quantity === 0 ? (
                      <button
                        onClick={() => dispatch(addToCart(item.id))}
                        className='absolute bottom-[-12px] left-1/2 -translate-x-1/2 text-xs sm:text-sm text-black bg-white cursor-pointer px-3 py-1.5 rounded-full shadow-md flex items-center justify-center gap-1.5'
                      >
                        <img
                          src='/images/korzina.svg'
                          alt='Cart'
                          className='w-4 h-4'
                        />
                        Add to Cart
                      </button>
                    ) : (
                      <div className='absolute bottom-[-12px] left-1/2 -translate-x-1/2 flex items-center bg-white px-3 py-1.5 rounded-full shadow-md gap-4'>
                        <button
                          onClick={() => dispatch(removeFromCart(item.id))}
                          className='w-7 h-7 flex items-center justify-center border border-gray-300 rounded-full text-lg font-bold'
                        >
                          -
                        </button>
                        <span className='text-sm font-semibold'>
                          {quantity}
                        </span>
                        <button
                          onClick={() => dispatch(addToCart(item.id))}
                          className='w-7 h-7 flex items-center justify-center border border-gray-300 rounded-full text-lg font-bold'
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>

                  <p className='text-sm sm:text-md text-[#87635A] mt-6'>
                    {item.category}
                  </p>
                  <h3 className='text-lg sm:text-xl font-bold text-[#260F08]'>
                    {item.name}
                  </h3>
                  <p className='text-[#C73B0F] text-xl sm:text-2xl'>
                    ${item.price}
                  </p>
                </div>
              );
            })}
        </div>
      </div>

      {/* Корзина */}
      <div className='w-full lg:w-1/3 bg-[#fff8f5] rounded-lg shadow-md p-4 sm:p-6'>
        <h3 className='text-lg sm:text-xl font-bold text-[#C73B0F] mb-4'>
          Your Cart ({Object.values(cart).reduce((a, b) => a + b, 0)})
        </h3>

        {Object.keys(cart).length === 0 ? (
          <p className='text-gray-500'>No items added yet</p>
        ) : (
          <>
            <ul className='space-y-4'>
              {data &&
                data.data
                  .filter((item) => cart[item.id])
                  .map((item) => (
                    <li
                      key={item.id}
                      className='flex justify-between items-center border-b border-gray-200 pb-3'
                    >
                      <div>
                        <p className='font-semibold text-[#260F08]'>
                          {item.name}
                        </p>
                        <div className='flex items-center gap-1 text-xs sm:text-sm'>
                          <span className='text-[#C73B0F] font-bold'>
                            {cart[item.id]}x
                          </span>
                          <span className='text-gray-500'>
                            @ ${item.price.toFixed(2)}
                          </span>
                          <span className='text-[#260F08] font-semibold'>
                            ${(item.price * cart[item.id]).toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => dispatch(deleteFromCart(item.id))}
                        className='w-6 h-6 flex items-center justify-center border border-gray-300 rounded-full text-gray-500 hover:text-[#C73B0F] hover:border-[#C73B0F] transition'
                      >
                        ×
                      </button>
                    </li>
                  ))}
            </ul>

            <div className='flex justify-between items-center mt-4'>
              <span className='text-gray-700 font-medium'>Order Total</span>
              <span className='text-xl sm:text-2xl font-bold text-[#260F08]'>
                $
                {data &&
                  data.data
                    .filter((item) => cart[item.id])
                    .reduce((sum, item) => sum + item.price * cart[item.id], 0)
                    .toFixed(2)}
              </span>
            </div>

            <div className='mt-4 bg-white rounded-lg p-3 flex items-center gap-2 border border-gray-100'>
              <img src='/images/derevo.svg' alt='' className='w-5 h-5' />
              <p className='text-xs sm:text-sm text-gray-600'>
                This is a <span className='font-semibold'>carbon-neutral</span>{" "}
                delivery
              </p>
            </div>

            <button
              onClick={() => dispatch(openOrderModal())}
              className='mt-4 w-full bg-[#C73B0F] hover:bg-[#a4300d] text-white font-semibold py-2 sm:py-3 rounded-full transition text-sm sm:text-base'
            >
              Confirm Order
            </button>
            <OrderModal />
          </>
        )}
      </div>
    </div>
  );
}
