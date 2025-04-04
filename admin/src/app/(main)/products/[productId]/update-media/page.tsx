import React from "react";
import UpdateMedia from "./UpdateMedia";
import { getProductbyId } from "./action";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ productId: string }>;
}

export default async function page(props: PageProps) {
  const params = await props.params;
  const productId = await params.productId;
  const result = await getProductbyId(productId);
  if (result.err || !("images" in result.data)) {
    return (
      <main className="w-full h-full flex justify-center items-center">
        <p className="text-3xl text-destructive font-semibold">{result.msg}</p>
      </main>
    );
  }
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
            <p className="text-4xl font-bold">Update Images</p>
          </div>
          <div className="pl-3 pt-6 pb-6 space-x-2 text-lg">
            <p>
              <b>Name:</b> {result.data.name}
            </p>
            <p>
              <b>Max Price:</b> {result.data.maxPrice}
            </p>
            <p>
              <b>Sell Price:</b> {result.data.sellPrice}
            </p>
          </div>
          <UpdateMedia oldMedia={result.data.images} productId={productId} />
        </>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <p className="text-5xl text-gray-400 font-bold">Access Dined</p>
        </div>
      )}
    </main>
  );
}
