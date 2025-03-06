import React from "react";
import { getCategories, getProductbyId } from "./action";
import UpdateForm from "./UpdateForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ productId: string }>;
}

export default async function page(props: PageProps) {
  const params = await props.params;
  const productId = await params.productId;
  const result = await getProductbyId(productId);
  const cookieStrore = await cookies();
  const permission = cookieStrore.get("permission");
  if (!permission) redirect("/login");

  const isadmin = permission.value.split(",").includes("ADMIN");
  const isProduct = permission.value.split(",").includes("PRODUCT");
  const isAccess = isadmin || isProduct;

  if (result.err || !("images" in result.data)) {
    return (
      <main className="w-full h-full flex justify-center items-center">
        <p className="text-3xl text-destructive font-semibold">{result.msg}</p>
      </main>
    );
  }

  const categoryResponse = await getCategories();
  return (
    <main className="w-full h-full relative">
      {isAccess ? (
        <>
          <div className="flex justify-center items-center pt-6">
            <p className="text-4xl font-bold">Update Product</p>
          </div>
          <div className="p-6 w-full h-full">
            <UpdateForm
              data={result.data}
              productId={productId}
              categories={categoryResponse.data}
            />
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
