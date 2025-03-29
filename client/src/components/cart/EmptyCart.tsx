import React from "react";

const EmptyCart: React.FC = () => {
  return (
    <>
      <div className="flex justify-center h-full">
        {/* Empty Cart Section */}
        <div className="bg-white w-full flex rounded-lg shadow-md justify-center justify-items-center items-center p-12">
          <div>
            <img
              src="https://cdn-icons-png.flaticon.com/512/1170/1170576.png"
              alt="Empty Cart"
              className="w-32 mx-auto mb-4"
            />
            <h2 className="text-2xl font-semibold text-center text-gray-7">
              Your cart is empty!
            </h2>
            <p className="text-gray-5 mt-2">
              Explore our wide selection and find something you like
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmptyCart;
