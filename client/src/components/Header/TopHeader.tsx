import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const TopHeader = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  const offers = [
    {
      slide: `Flat 10% OFF, USE CODE: FLAT10, Flat 20% OFF on orders above 2999 INR (Automatically Applied) - Free Shipping on orders above 999 INR`,
    },
  ];

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      autoplay={{ delay: 3000 }}
      className="shadow-lg text-center"
      style={{ backgroundColor: "#111" }}
    >
      {offers.map((item, i) => (
        <SwiperSlide key={i}>
          <div className=" w-full  " data-aos="fade-up">
            <div
              className="overflow-hidden whitespace-nowrap  "
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <span className="inline-block text-white font-normal text-sm md:text-sm p-2.5">
                {item.slide}
              </span>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TopHeader;
