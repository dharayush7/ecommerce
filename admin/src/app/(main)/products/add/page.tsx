import React from "react";
import AddProductForm from "./AddProductForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function page() {
  const cookieStrore = await cookies();
  const permission = cookieStrore.get("permission");
  if (!permission) redirect("/login");

  const isadmin = permission.value.split(",").includes("ADMIN");
  const isProduct = permission.value.split(",").includes("PRODUCT");
  const isAccess = isadmin || isProduct;
  return (
    <main className="w-full h-full relative">
      {isAccess ? (
        <>
          <div className="flex justify-center items-center pt-6">
            <p className="text-4xl font-bold">Add Product</p>
          </div>
          <div className="p-6 w-full h-full">
            <AddProductForm />
          </div>
        </>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <p className="text-5xl text-gray-400 font-bold">Access Dined</p>
        </div>
      )}
    </main>
  );
}
