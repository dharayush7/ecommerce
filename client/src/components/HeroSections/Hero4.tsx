import { Link } from "react-router";

export const Hero4 = () => {
  return (
    <div className="w-full bg-black text-white py-9 flex justify-center">
      <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between px-6 md:px-12">
        {/* Left Side - Text */}
        <div className="text-center md:text-left">
          <h2
            className="text-3xl md:text-4xl font-semibold tracking-wide"
            style={{
              fontFamily: "Henny Penny",
            }}
          >
            CLINIQUE
          </h2>
          <p className="mt-2 text-lg">Flat 50% off.</p>
          <p className="text-lg">Offer auto-applied at checkout.</p>
        </div>

        {/* Right Side - Button */}
        <div className="mt-6 md:mt-0">
          <Link
            to="category/cm8ofllb200051fppmxntysix"
            className="px-6 py-2.5 text-lg font-medium tracking-wide transition-transform duration-300  rounded-md  bg-white text-black hover:bg-slate-2 ease-in duration-400"
          >
            SHOP NOW
          </Link>
        </div>
      </div>
    </div>
  );
};
