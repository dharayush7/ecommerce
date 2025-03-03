import Manegers from "@/app/(main)/maneger/Manegers";
import AddManegerForm from "@/app/(main)/maneger/AddManegerForm";

import React from "react";

function page() {
  return (
    <main className="w-full h-full relative">
      <div className="p-6 w-full">
        <div className="flex justify-between items-center">
          <p className="text-4xl font-bold">Manegers</p>
          <AddManegerForm />
        </div>
        <Manegers />
      </div>
      <div className="h-[200vh] w-20"></div>
    </main>
  );
}

export default page;
