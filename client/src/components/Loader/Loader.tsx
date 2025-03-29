import { Loader as Icon } from "lucide-react";

export default function Loader() {
  return (
    <div className="fixed z-50 h-full w-full bg-black/35 top-0 left-0 overflow-hidden">
      <div className="w-full h-full flex justify-center items-center">
        <Icon className="animate-spin text-white" size={60} />
      </div>
    </div>
  );
}
