import "aos/dist/aos.css";
import { Link } from "react-router";

const Hero2 = () => {
  return (
    <div className="w-full overflow-hidden flex flex-col md:flex-row lg:gap-0 md:gap-10">
      {/* First Image */}
      <div className="relative w-full md:w-1/2">
        <div data-aos="fade-up" data-aos-duration="1000" className="relative">
          <img
            src="https://beardo.in/cdn/shop/products/6_d15ab975-3c4a-4dfb-99fa-d52da5bfd594.jpg?v=1739431685&width=1946"
            alt="Burberry Goddess Eau De Parfum"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute w-full bottom-8 bg-opacity-50 flex items-center justify-center">
            <div className="text-white text-center p-4">
              <Link
                to="#"
                className="mt-3 inline-block font-bold text-lg py-2 px-14 rounded-lg bg-white text-black hover:bg-gray-2 ease-in duration-200"
              >
                Explore
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Second Image */}
      <div className="relative w-full md:w-1/2">
        <div data-aos="fade-up" data-aos-duration="1000" className="relative">
          <img
            src="https://www.perfume24x7.com/cdn/shop/files/Burberry_Goddess_Eau_De_Parfum_For_Women_F.jpg?v=1728238931&width=832"
            alt="Bvlgari Man in Black Parfum"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute bottom-8 w-full  bg-opacity-50 flex items-center justify-center">
            <div className="text-white text-center p-4">
              <Link
                to="#"
                className="mt-3 inline-block font-bold py-2 px-14 text-lg rounded-lg bg-black text-white hover:bg-gray-8 ease-in duration-200"
              >
                Explore
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero2;
