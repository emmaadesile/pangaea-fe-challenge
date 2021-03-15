import * as React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { PRODUCTS, CURRENCY } from '../graphql/queries';
import ProductCard from '../components/ProductCard';
import Cart from '../components/Cart';

const actionTypes = {
  ADD_PRODUCT: 'ADD_PRODUCT',
  REMOVE_PRODUCT: 'REMOVE_PRODUCT',
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
              price: item.price * updatedQty,
              quantity: updatedQty,
            };
          } else {
            return item;
          }
        });
      } else {
        return state.concat({ ...action.payload });
      }

    case actionTypes.REMOVE_PRODUCT:
      return state.filter((product) => product.id === action.payload.id);

    default:
      return state;
  }
};

const initialState = [];

const Products = () => {
  const { loading, data } = useQuery(PRODUCTS);
  const [showCart, setShowCart] = React.useState(false);
  const [cartState, dispatch] = React.useReducer(reducer, initialState);

  const products = React.useMemo(() => {
    return data?.products?.map((product) => ({
      ...product,
      quantity: 1,
    }));
  }, [data?.products]);

  const handleAddToCart = (newItem) => {
    dispatch({ type: actionTypes.ADD_PRODUCT, payload: newItem });
    setShowCart(!showCart);
  };

  return (
    <React.Fragment>
      <div className="md:py-16 max-w-5xl mx-auto bg-white px-10">
        <h1 className="text-base md:text-4xl text-bold">All Products</h1>
        <p>A 360 look at Lumin</p>
      </div>

      <div className="bg-pangaea-green-light py-12">
        <div className="max-w-5xl mx-auto ">
          <div className="grid grid-cols-3cols gap-10">
            {products?.map(
              ({ id, image_url, title, price, quantity }, index) => (
                <ProductCard
                  key={index}
                  id={id}
                  image={image_url}
                  title={title}
                  price={price}
                  quantity={quantity}
                  handleAddToCart={handleAddToCart}
                />
              )
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
      {/* <Cart setShowCart={() => setShowCart(!showCart)} /> */}
    </React.Fragment>
  );
};

export default Products;
