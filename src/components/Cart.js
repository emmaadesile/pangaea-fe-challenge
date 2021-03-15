import * as React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { CURRENCY } from '../graphql/queries';
import CartContext from '../CartContext';
import BackButton from '../icons/BackButton';
import Close from '../icons/Close';

import { actionTypes } from '../pages/Products';

const Cart = ({ cartState, setShowCart, showCart }) => {
  const cartContext = React.useContext(CartContext);
  const { data } = useQuery(CURRENCY);
  const cartTotlPrice = React.useMemo(() => {
    return cartState.reduce((total, item) => {
      if (item.price) {
        return total + item.price;
      }
    }, 0);
  }, [cartState]);

  return (
    <div className="h-full w-full fixed top-0 z-10 bg-gray-700 bg-opacity-40">
      <div
        className={`h-full w-full md:w-1/2 2xl:w-2/5 bg-cart-bg fixed top-0 z-10 right-0 px-5 md:px-10 py-10 
      ${showCart ? ' opacity-100 animate-slideInMenu' : 'invisible opacity-0'}
      `}
      >
        <div className="relative min-h-full ">
          <div className="grid place-items-center w-full relative">
            <div
              className="w-6 h-6 rounded-xl border-gray-300 border p-1 absolute left-0 cursor-pointer"
              onClick={setShowCart}
            >
              <BackButton />
            </div>
            <p className="uppercase text-sm text-gray-500">Your Cart</p>
          </div>

          <div className="mt-4">
            <select
              className="w-18 h-8 px-2 py-1"
              onChange={(e) => cartContext.setCurrency(e.target.value)}
            >
              {data?.currency?.map((curr, index) => (
                <option key={index}>{curr}</option>
              ))}
            </select>
          </div>

          {!cartState.length ? (
            <div className="w-full h-10 grid place-items-center mt-10">
              <p className=" text-gray-500">Your cart is empty.</p>
            </div>
          ) : (
            cartState.map((item, index) => (
              <div className="bg-white pl-5 pr-3 py-3 mt-6" key={index}>
                <div className="bg flex items-center justify-between">
                  <p className="text-gray-600 text-sm">{item.title}</p>
                  <div
                    className="w-3 h-3 cursor-pointer"
                    onClick={() =>
                      cartContext.cartDispatch({
                        type: actionTypes.REMOVE_PRODUCT,
                        payload: item,
                      })
                    }
                  >
                    <Close />
                  </div>
                </div>

                <div className="flex justify-end mt-4 mr-0 md:mr-10">
                  <img
                    alt="cart-item"
                    src={item.image_url}
                    className="w-16 h-16"
                  />
                </div>

                <div className="grid grid-cols-3 w-full mt-2">
                  <div className="border border-gray-400 flex items-center h-8 w-20">
                    <button
                      className="w-6"
                      onClick={() =>
                        cartContext.cartDispatch({
                          type: actionTypes.DECREASE_PRODUCT,
                          payload: item,
                        })
                      }
                    >
                      -
                    </button>
                    <p className="w-6 text-center">{item.quantity}</p>
                    <button
                      className="w-6"
                      onClick={() =>
                        cartContext.cartDispatch({
                          type: actionTypes.ADD_PRODUCT,
                          payload: item,
                        })
                      }
                    >
                      +
                    </button>
                  </div>

                  <div className="grid items-center justify-items-center">
                    <p>{item.price}</p>
                  </div>
                </div>
              </div>
            ))
          )}

          <div className="grid mt-6 gap-4 absolute bottom-3 w-full">
            <div className="border-t border-pangaea-green-dark"></div>
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>${`${cartTotlPrice}.00`}</p>
            </div>

            <div className="grid w-full h-12 place-items-center bg-white  cursor-pointer">
              <button className="uppercase text-sm text-gray-600 w-full h-full border-pangaea-green-dark border">
                make this a subscription (save 20%)
              </button>
            </div>

            <div className="grid w-full h-12 place-items-center bg-pangaea-green-dark border cursor-pointer">
              <button className="uppercase text-sm text-white border-pangaea-green-dark border">
                proceed to checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
