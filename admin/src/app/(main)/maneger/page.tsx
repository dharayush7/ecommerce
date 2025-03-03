import React from "react";
import Manegers from "./Manegers";
import AddManegerForm from "./AddManegerForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function page() {
  const cookieStrore = await cookies();
  const permission = cookieStrore.get("permission");
  if (!permission) redirect("/login");

  const isadmin = permission.value.split(",").includes("ADMIN");
  return (
    <main className="w-full h-full relative">
      <div className="p-6 w-full h-full">
        {isadmin ? (
          <>
            <div className="flex justify-between items-center">
              <p className="text-4xl font-bold">Manegers</p>
              <AddManegerForm />
            </div>
            <Manegers />
          </>
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <p className="text-5xl text-gray-400 font-bold">Access Dined</p>
          </div>
        )}
      </div>
    </main>
  );
}

export default page;
