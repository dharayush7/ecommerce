import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import AOS from "aos";
import "aos/dist/aos.css";
import "swiper/swiper-bundle.css";

const slides = [
  {
    id: 1,
    image:
      "https://www.houseofem5.com/cdn/shop/files/hero-image-desktop_1728x.jpg?v=1728053350",
    title: "The Most Wanted",
    subtitle: "BY AZZARO",
    link: "/collections/azzaro-perfumes.html",
  },
  {
    id: 2,
    image:
      "https://www.houseofem5.com/cdn/shop/files/6_8afb9bf7-e051-485d-8af2-6a7267f20a59_1728x.png?v=1666160114",
    title: "Sì Passione",
    subtitle: "Giorgio Armani",
    link: "/products/giorgio-armani-si-passione-edp-for-women-100ml.html",
  },
  {
    id: 3,
    image:
      "https://www.houseofem5.com/cdn/shop/files/House_Of_EM5_-_Candle_New_-_Header_Image_1728x.png?v=1735913189",
    title: "Angel",
    subtitle: "Thierry Mugler",
    link: "/collections/mugler-perfumes.html",
  },
];

const IntroCarousel = () => {
  useEffect(() => {
    // Initialize AOS
    AOS.init();
  }, []);

  return (
    <div className="w-full max-w-8xl mx-auto min-h-[50vh]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        className="shadow-lg min-h-[50vh]"
        id="car"
      >
        {slides.map((slide, id) => (
          <SwiperSlide key={id}>
            <div className="relative min-h-[50vh]" data-aos="fade-up">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full min-h-[50vh] object-cover"
              />
              <div
                className="absolute inset-0 bg-opacity-40 flex flex-col justify-end p-6 text-white"
                data-aos="fade-down"
                data-aos-delay="400"
              >
                <h2 className="text-2xl md:text-4xl font-bold">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-xl">{slide.subtitle}</p>

                <div className="relative inline-flex group mt-3">
                  <a
                    role="button"
                    className="group relative inline-flex items-center justify-center text-base rounded-xl bg-black  px-5  py-2.5 font-semibold text-white transition-all duration-200 hover:bg-gray-8 hover:shadow-lg hover:-translate-y-0.5 hover:shadow-gray-6/30"
                    title="payment"
                    href="#"
                  >
                    Explore
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 10 10"
                      height="10"
                      width="10"
                      fill="none"
                      className="mt-0.5 ml-2 -mr-1 stroke-white stroke-2"
                    >
                      <path
                        d="M0 5h7"
                        className="transition opacity-0 group-hover:opacity-100"
                      ></path>
                      <path
                        d="M1 1l4 4-4 4"
                        className="transition group-hover:translate-x-[3px]"
                      ></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default IntroCarousel;
