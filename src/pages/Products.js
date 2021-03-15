import * as React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { PRODUCTS } from '../graphql/queries';
import CartContext from '../CartContext';
import ProductCard from '../components/ProductCard';
import Cart from '../components/Cart';
import Loading from '../components/Loading';
import ShoppingCart from '../icons/ShoppingCart';

export const actionTypes = {
  ADD_PRODUCT: 'ADD_PRODUCT',
  REMOVE_PRODUCT: 'REMOVE_PRODUCT',
  DECREASE_PRODUCT: 'DECREASE_PRODUCT',
  UPDATE_PRICE: 'UPDATE_PRICE'
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_PRODUCT:
      const itemInsert = state.find((item) => item.id === action.payload.id);

      if (itemInsert) {
        return state.map((item) => {
          if (item.id === action.payload.id) {
            const updatedQty = item.quantity + 1;
            return {
              ...item,
              price: action.payload.cartPrice * updatedQty,
              quantity: updatedQty,
            };
          } else {
            return item;
          }
        });
      } else {
        return state.concat({ ...action.payload });
      }

    case actionTypes.DECREASE_PRODUCT:
      if (action.payload.quantity === 1) {
        return state.filter((product) => product.id !== action.payload.id);
      } else {
        return state.map((item) => {
          if (item.id === action.payload.id) {
            const updatedQty = item.quantity - 1;
            return {
              ...item,
              price: action.payload.cartPrice * updatedQty,
              quantity: updatedQty,
            };
          }
        });
      }

    case actionTypes.REMOVE_PRODUCT:
      return state.filter((item) => item.id !== action.payload.id);

    case actionTypes.UPDATE_PRICE:
      return state.map(item => {

      });

    default:
      return state;
  }
};

const initialState = [];

const Products = () => {
  const [currency, setCurrency] = React.useState('USD');
  const { loading, data, refetch } = useQuery(PRODUCTS, {
    variables: { currency },
  });
  const [showCart, setShowCart] = React.useState(false);
  const [cartState, dispatch] = React.useReducer(reducer, initialState);

  // refetch products based on price
  React.useEffect(() => {
    if (currency) {
      refetch();
    }
  }, [currency, refetch]);

  // get product and save
  const products = React.useMemo(() => {
    if (currency) {
      return data?.products?.map((product) => ({
        ...product,
        quantity: 1,
        cartPrice: product.price,
      }));
    }
  }, [data?.products, currency]);

  const handleAddToCart = (newItem) => {
    dispatch({ type: actionTypes.ADD_PRODUCT, payload: newItem });
    setShowCart(!showCart);
  };

  const updateCartPrice = (newPriceList) => {

  }

  return (
    <React.Fragment>
      <CartContext.Provider
        value={{ cartState, cartDispatch: dispatch, setCurrency }}
      >
        <nav className="grid grid-cols-2 space-x-1 px-5 md:px-20 py-6 border-pangaea-green-light border-b">
          <div className="flex gap-5 items-center">
            <div className="">
              <a href="/">
                <p className="text-3xl uppercase tracking-widest">Lumin</p>
              </a>
            </div>

            <div className="flex gap-2">
              <a href="/">
                <p>Shop</p>
              </a>
              <a href="/">
                <p>Learn</p>
              </a>
            </div>
          </div>

          <div className="flex items-center justify-self-end gap-3 relative">
            <p>Account</p>
            <div onClick={() => setShowCart(!showCart)} className="cursor-pointer">
              <ShoppingCart />
              <span className="text-sm absolute -right-3 bottom-4 bg-pangaea-green-light rounded-xl w-5 h-5 text-center">
                {cartState.length}
              </span>
            </div>
          </div>
        </nav>
        <div className="md:py-16 py-8 max-w-5xl mx-auto bg-white px-10">
          <h1 className="text-base md:text-4xl text-bold">All Products</h1>
          <p>A 360 look at Lumin</p>
        </div>

        <div className="bg-pangaea-green-light py-12">
          <div className="max-w-5xl mx-auto ">
            <div className="grid grid-cols-3cols gap-5 lg:gap-20 md:gap-10">
              {loading ? (
                <Loading />
              ) : (
                products?.map((item, index) => (
                  <ProductCard
                    key={index}
                    item={item}
                    currency={currency}
                    handleAddToCart={handleAddToCart}
                  />
                ))
              )}
            </div>
          </div>
        </div>

        {showCart && (
          <Cart
            setShowCart={() => setShowCart(!showCart)}
            showCart={showCart}
            cartState={cartState}
          />
        )}
      </CartContext.Provider>
    </React.Fragment>
  );
};

export default Products;
