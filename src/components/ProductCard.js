import * as React from 'react';

const ProductCard = ({
  id,
  quantity,
  image,
  title,
  price,
  handleAddToCart,
}) => {
  return (
    <div className="grid items-center justify-items-center">
      <div className="w-64 h-80 grid items-center justify-items-center overflow-hidden">
        <img src={image} alt="lumin-product" className="mb-5 object-contain" />
      </div>

      <div className="grid place-items-center">
        <div className="text-center mb-5">
          <h3>{title}</h3>
          <p>From: ${price}</p>
        </div>

        <button
          className="bg-pangaea-green-dark w-36 h-10 transition ease-in-out hover:shadow-lg"
          onClick={() => handleAddToCart({ id, image, title, price, quantity })}
        >
          <p className="text-white">Add to Cart</p>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
