import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Hero3: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, offset: 100, once: true });
  }, []);

  return (
    <div className="bg-pink w-full hidden md:block">
      <div className="flex flex-wrap">
        {/* Men's Section */}
        <div className="w-full md:w-1/2 p-2">
          <a
            href="collections/top-10-perfumes-for-men-p24x7.html"
            className="relative block p-4 text-center rounded-lg transition"
          >
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {/* Image 1 */}
              <img
                src="https://www.perfume24x7.com/cdn/shop/products/Dunhill_Icon_EDP_For_Men_1.jpg?v=1622733769&width=540"
                alt="Dunhill Icon EDP For Men"
                className="w-28 md:w-30 rounded-lg aos-init"
                data-aos="fade-up"
              />
              {/* Image 2 */}
              <img
                src="https://www.perfume24x7.com/cdn/shop/products/Issey_Miyake_Leau_D_issey_Pour_Homme_EDT.jpg?v=1622729306&width=540"
                alt="Issey Miyake Leau Dissey For Men"
                className="w-28 md:w-30 rounded-lg aos-init"
                data-aos="fade-up"
              />
              {/* Image 3 */}
              <img
                src="https://www.perfume24x7.com/cdn/shop/products/Dunhill_Icon_EDP_For_Men_1.jpg?v=1622733769&width=540"
                alt="Dunhill Icon EDP For Men"
                className="w-28 md:w-30 rounded-lg aos-init"
                data-aos="fade-up"
              />
            </div>
          </a>
        </div>

        {/* Women's Section */}
        <div className="w-full md:w-1/2 p-2">
          <a
            href="collections/womens-top-10-p24x7.html"
            className="relative block p-4 text-center transition"
          >
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {/* Image 1 */}
              <img
                src="https://www.perfume24x7.com/cdn/shop/products/Dunhill_Icon_EDP_For_Men_1.jpg?v=1622733769&width=540"
                alt="Dunhill Icon EDP For Men"
                className="w-28 md:w-30 rounded-lg aos-init"
                data-aos="fade-up"
              />
              {/* Image 2 */}
              <img
                src="https://www.perfume24x7.com/cdn/shop/products/Issey_Miyake_Leau_D_issey_Pour_Homme_EDT.jpg?v=1622729306&width=540"
                alt="Issey Miyake Leau Dissey For Men"
                className="w-28 md:w-30 rounded-lg aos-init"
                data-aos="fade-up"
              />
              {/* Image 3 */}
              <img
                src="https://www.perfume24x7.com/cdn/shop/products/Dunhill_Icon_EDP_For_Men_1.jpg?v=1622733769&width=540"
                alt="Dunhill Icon EDP For Men"
                className="w-28 md:w-30 rounded-lg aos-init"
                data-aos="fade-up"
              />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero3;
