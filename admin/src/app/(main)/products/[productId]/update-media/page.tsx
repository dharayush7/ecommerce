import React from "react";
import UpdateMedia from "./UpdateMedia";
import { getProductbyId } from "./action";

interface PageProps {
  params: { productId: string };
}

export default async function page({ params }: PageProps) {
  const productId = await params.productId;
  const result = await getProductbyId(productId);
  if (result.err) {
    return (
      <main className="w-full h-full flex justify-center items-center">
        <p className="text-3xl text-destructive font-semibold">{result.msg}</p>
      </main>
    );
  }
  return (
    <main className="w-full h-full relative">
      <UpdateMedia />
    </main>
  );
}
