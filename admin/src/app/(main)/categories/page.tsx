import React from "react";
import Categories from "./Categoris";
import AddCategory from "./AddCategory";

export default function page() {
  return (
    <main className="w-full h-full relative">
      <div className="p-6 w-full h-full">
        <div className="flex justify-between items-center">
          <p className="text-4xl font-bold">Categories</p>
          <AddCategory />
        </div>
        <Categories />
      </div>
    </main>
  );
}
