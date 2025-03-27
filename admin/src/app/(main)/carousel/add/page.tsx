import React from "react";
import AddCarouselForm from "./addCarouselForm";

export default function page() {
  return (
    <div>
      <div className="flex justify-center items-center pt-6">
        <p className="text-4xl font-bold">Add Product</p>
      </div>
      <div className="p-6 w-full h-full">
        <AddCarouselForm />
      </div>
    </div>
  );
}
