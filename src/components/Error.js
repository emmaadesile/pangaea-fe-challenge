const ErrorComp = () => {
  return (
    <div className="flex">
      <div className=" bg-white">
        <p className="text-sm text-center text-red-400 p-2">
          No products in this currecy. Please select another currency.
        </p>
      </div>
    </div>
  );
};

export default ErrorComp;