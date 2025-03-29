import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const cookieStrore = await cookies();
  const permission = cookieStrore.get("permission");
  if (!permission) redirect("/login");
  return (
    <main className="w-full h-full justify-center items-center flex">
      <div className="w-[50vw] flex justify-center items-center flex-col gap-3">
        <p className="text-3xl font-semibold">
          Welcome to Your eCommerce Control Center!
        </p>
        <p className="text-lg text-justify">
          You&apos;re now at the heart of your online store. From managing
          products to monitoring orders, everything you need to run your
          business smoothly is right here. Let’s make things happen and take
          your store to the next level!
        </p>
      </div>
    </main>
  );
};

export default page;
