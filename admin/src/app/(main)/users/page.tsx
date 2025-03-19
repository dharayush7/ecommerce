import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import Users from "./Users";

export default async function page() {
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
              <p className="text-4xl font-bold">Users</p>
            </div>
            <Users />
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
