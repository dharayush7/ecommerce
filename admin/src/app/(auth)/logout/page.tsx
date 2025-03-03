"use client";
import React, { useEffect } from "react";
import { logout } from "./action";

function Page() {
  useEffect(() => {
    logout().then(() => console.log("log out complete"));
  }, []);
  return <div>Logging out..</div>;
}

export default Page;
