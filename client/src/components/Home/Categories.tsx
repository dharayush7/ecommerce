import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Mousewheel } from "swiper/modules";
import { useNavigate } from "react-router";
import { CategoryCard } from "../card/CategoryCard";
import { categories } from "@/data/productData";
import "./style/swipper.css";

export const Categories = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-8xl mx-auto p-8 md:px-3 mt-5 z-0">
      <h2 className="text-3xl font-semibold text-center mb-8">
        {" "}
        Top Categories
      </h2>
      <Swiper
        modules={[Pagination, Mousewheel]}
        mousewheel
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          600: { slidesPerView: 2 },
          769: { slidesPerView: 3 },
          950: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
        pagination={{ clickable: true }}
        className="pb-10"
        id="sw"
      >
        {categories.map((category, index) => (
          <SwiperSlide key={index} onClick={() => navigate("/ProductPage")}>
            <CategoryCard img={category.img} name={category.name} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
