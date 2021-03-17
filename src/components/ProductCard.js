import * as React from 'react';

const ProductCard = ({ item, currency, handleAddToCart }) => {
  const price = new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency,
  }).format(item.price);

  return (
    <div className="grid items-center justify-items-center">
      <div className="w-40 h-48 md:w-56 md:h-64 grid items-center justify-items-center overflow-hidden">
        <img
          src={item.image_url}
          alt="lumin-product"
          className="mb-5 object-contain"
        />
      </div>

      <div className="grid place-items-center">
        <div className="text-center mb-5">
          <h3 className="text-pangaea-green-dark">{item.title}</h3>
          <p className="text-gray-800">From: {price}</p>
        </div>

        <button
          className="bg-pangaea-green-dark w-36 h-10 transition ease-in-out hover:shadow-lg"
          onClick={() => handleAddToCart(item)}
        >
          <p className="text-white">Add to Cart</p>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
