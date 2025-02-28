import Image from "next/image";
import assets from "@/assets";
import LoginForm from "./LoginForm";

export default function Page() {
  return (
    <main className="w-screen h-screen flex justify-center items-center bg-accent">
      <div className="w-3/5 flex h-3/5 justify-between items-center bg-background rounded-3xl shadow-xl">
        <div className="w-1/2 h-full flex flex-col justify-center items-center">
          <div className="ml-16 pb-6">
            <p className="text-2xl font-bold">Login to Admin Panel</p>
          </div>
          <LoginForm />
        </div>
        <div className="w-1/2">
          <Image
            src={assets.loginBackground}
            alt="login image"
            className="overflow-hidden -ml-6 xl:-ml-9"
          />
        </div>
      </div>
    </main>
  );
}
