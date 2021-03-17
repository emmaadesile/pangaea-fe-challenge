import * as React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { PRODUCTS, CURRENCY } from '../graphql/queries';
import CartContext from '../CartContext';
import ProductCard from '../components/ProductCard';
import Cart from '../components/Cart';
import Loading from '../components/Loading';
import ShoppingCart from '../icons/ShoppingCart';

export const actionTypes = {
  ADD_PRODUCT: 'ADD_PRODUCT',
  REMOVE_PRODUCT: 'REMOVE_PRODUCT',
  DECREASE_PRODUCT: 'DECREASE_PRODUCT',
  UPDATE_PRICE: 'UPDATE_PRICE',
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
      }

      return state.map((item) => {
        if (item.id === action.payload.id) {
          const updatedQty = item.quantity - 1;
          return {
            ...item,
            price: item.cartPrice * updatedQty,
            quantity: updatedQty,
          };
        } else {
          return item;
        }
      });

    case actionTypes.REMOVE_PRODUCT:
      return state.filter((item) => item.id !== action.payload.id);

    case actionTypes.UPDATE_PRICE:
      return state.map((item) => {
        const payloadItem = action.payload[0];
        if (item.id === payloadItem[0].id) {
          return {
            ...item,
            price: payloadItem[0].price,
            cartPrice: payloadItem[0].price * item.quantity,
          };
        }
        return null;
      });

    default:
      return state;
  }
};

const initialState = [];

const Products = () => {
  const [currency, setCurrency] = React.useState('USD');
  const { loading: loadingCurrencies, data: currencyData } = useQuery(CURRENCY);
  const [currencyChanged, setCurrencyChanged] = React.useState(false);
  const [showError, setShowError] = React.useState(false);
  const {
    loading,
    data,
    error: productsError,
    refetch: refetchProducts,
  } = useQuery(PRODUCTS, {
    variables: { currency },
    fetchPolicy: 'network-only',
  });
  const [showCart, setShowCart] = React.useState(false);
  const [cartState, dispatch] = React.useReducer(reducer, initialState);

  // get product and save
  const products = React.useMemo(() => {
    if (data?.products) {
      setShowError(false);

      return data.products.map((product) => ({
        ...product,
        quantity: 1,
        cartPrice: product.price,
      }));
    }
  }, [data?.products]);

  React.useEffect(() => {
    /*
      update cart prices when currency changes 
    */
    if (currencyChanged && !loading && data?.products) {
      const updatedCart = cartState.map((item) => {
        return data?.products.filter((product) => {
          if (product.id === item.id) {
            return {
              ...product,
              price: item.price,
            };
          }
          return null;
        });
      });

      setCurrencyChanged(false);

      dispatch({ type: actionTypes.UPDATE_PRICE, payload: updatedCart });
    }
  }, [loading, cartState, currencyChanged, data?.products]);

  const handleAddToCart = (newItem) => {
    dispatch({ type: actionTypes.ADD_PRODUCT, payload: newItem });
    setShowCart(!showCart);
  };

  React.useEffect(() => {
    if (productsError) {
      setShowError(true);
    }
  }, [productsError]);

  const handleChangeCurrency = async (currency) => {
    setCurrency(currency);
    await refetchProducts();

    setCurrencyChanged(true);
  };

  return (
    <React.Fragment>
      <CartContext.Provider
        value={{
          cartState,
          cartDispatch: dispatch,
          setCurrency,
          handleChangeCurrency,
          showError,
        }}
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
            <div
              onClick={() => setShowCart(!showCart)}
              className="cursor-pointer"
            >
              <ShoppingCart />
              <span className="text-sm text-white absolute -right-3 bottom-4 bg-pangaea-green-dark rounded-xl w-5 h-5 text-center">
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
              ) : productsError ? (
                <div className="flex items-center justify-items-center">
                  An error occured. Please refresh your browser
                </div>
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
            currency={currency}
            cartLoading={loading}
            currencyData={currencyData}
            loadingCurrencies={loadingCurrencies}
          />
        )}
      </CartContext.Provider>
    </React.Fragment>
  );
};

export default Products;
