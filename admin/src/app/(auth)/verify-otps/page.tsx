import assets from "@/assets";
import Image from "next/image";
import React from "react";
import VerifyOtpsForm from "./VerifyOtpsForm";

function page() {
  return (
    <main className="w-screen h-screen flex justify-center items-center bg-accent">
      <div className="w-3/5 flex h-3/5 justify-between items-center bg-background rounded-3xl shadow-xl">
        <div className="w-1/2">
          <Image
            src={assets.otpBackground}
            alt="login image"
            className="overflow-hidden"
          />
        </div>
        <div className="w-1/2 h-full flex flex-col justify-center items-center space-y-2">
          <div className="">
            <p className="text-3xl font-semibold">Verification</p>
          </div>
          <VerifyOtpsForm />
        </div>
      </div>
    </main>
  );
}

export default page;
