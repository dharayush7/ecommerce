const Hero5 = () => {
  return (
    <div className="relative w-full h-[400px] md:h-[400px] lg:h-[600px] flex items-center justify-center ">
      {/* Background Image */}
      <img
        src="https://www.perfume24x7.com/cdn/shop/files/cool-water-reborn-eau-de-parfum.webp?v=1714163839&width=1920"
        alt="Cool Water Reborn Eau de Parfum"
        className="absolute inset-0 w-full h-full object-fill"
      />

      {/* Overlay */}

      {/* Content */}
      <div className="absolute text-center text-white px-6 bottom-8">
        <a
          href="#"
          className="mt-6 inline-block px-14 py-3 text-lg rounded-lg font-bold transition bg-black hover:bg-gray-8 ease-in duration-200"
        >
          REBORN
        </a>
      </div>
    </div>
  );
};

export default Hero5;
