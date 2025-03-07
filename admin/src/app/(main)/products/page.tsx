import { Button } from "@/components/ui/button";
import React from "react";
import Products from "./Products";
import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import ClearUploadButton from "./ClearUploadButton";

async function page() {
  const cookieStrore = await cookies();
  const permission = cookieStrore.get("permission");
  if (!permission) redirect("/login");

  const isadmin = permission.value.split(",").includes("ADMIN");
  const isProduct = permission.value.split(",").includes("PRODUCT");
  const isAccess = isadmin || isProduct;
  return (
    <main className="w-full h-full relative">
      {isAccess ? (
        <div className="p-6 w-full h-full">
          <div className="flex justify-between items-center">
            <p className="text-4xl font-bold">Products</p>
            <div className="flex w-fit space-x-2 items-center">
              <ClearUploadButton />
              <Button className="cursor-pointer">
                <Link href="/products/add">Add product</Link>
              </Button>
            </div>
          </div>
          <Products />
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <p className="text-5xl text-gray-400 font-bold">Access Dined</p>
        </div>
      )}
    </main>
  );
}

export default page;
