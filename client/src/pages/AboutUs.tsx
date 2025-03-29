import React from "react";
import pic1 from "@/assets/about/pic1.png";
import pic2 from "@/assets/about/pic2.png";

const AboutUsPage: React.FC = () => {
  return (
    <div className="bg-gray-1 w-full flex flex-col justify-center items-center p-4 space-y-4">
      <div className="mt-4 mb-8">
        <p className="text-2xl md:text-3xl font-semibold">About Us</p>
      </div>
      <section className="shadow container bg-white p-4 rounded-md flex lg:flex-row-reverse gap-10 justify-between flex-col items-center">
        <img
          src={pic1}
          alt="Quality"
          className="w-52 h-auto object-contain rounded"
        />
        <div className="w-full lg:text-left text-center p-6 ">
          <h3 className="text-xl md:text-2xl font-bold text-black mb-3">
            Our Story
          </h3>
          <span className="text-gray-6">
            We use only the finest ingredients, and all our products undergo
            strict quality control measures to ensure excellence. Our goal is to
            create a unique blend of Indian and Western fragrances that
            highlight each individual's personality. Each of our perfumes
            contains a mixture of Indian herbs and world-class ingredients,
            resulting in a unique and memorable experience.
          </span>
        </div>
      </section>
      <section className="shadow container bg-white p-4 rounded-md flex lg:flex-row gap-10 justify-between flex-col items-center">
        <img
          src={pic2}
          alt="Quality"
          className="w-52 h-auto object-contain rounded"
        />
        <div className="w-full lg:text-left text-center p-6 ">
          <h3 className="text-xl md:text-2xl font-bold text-black mb-3">
            Our vision
          </h3>
          <span className="text-gray-6">
            We use only the finest ingredients, and all our products undergo
            strict quality control measures to ensure excellence. Our goal is to
            create a unique blend of Indian and Western fragrances that
            highlight each individual's personality. Each of our perfumes
            contains a mixture of Indian herbs and world-class ingredients,
            resulting in a unique and memorable experience.
          </span>
        </div>
      </section>
      <section className="shadow container bg-white p-4 rounded-md flex lg:flex-row-reverse gap-10 justify-between flex-col items-center">
        <img
          src={pic2}
          alt="Quality"
          className="w-52 h-auto object-contain rounded"
        />
        <div className="w-full lg:text-left text-center p-6 ">
          <h3 className="text-xl md:text-2xl font-bold text-black mb-3">
            Quality
          </h3>
          <span className="text-gray-6">
            We use only the finest ingredients, and all our products undergo
            strict quality control measures to ensure excellence. Our goal is to
            create a unique blend of Indian and Western fragrances that
            highlight each individual's personality. Each of our perfumes
            contains a mixture of Indian herbs and world-class ingredients,
            resulting in a unique and memorable experience.
          </span>
        </div>
      </section>
      <section className="shadow container bg-white p-4 rounded-md flex lg:flex-row gap-10 justify-between flex-col items-center">
        <img
          src={pic1}
          alt="Quality"
          className="w-52 h-auto object-contain rounded"
        />
        <div className="w-full lg:text-left text-center p-6 ">
          <h3 className="text-xl md:text-2xl font-bold text-black mb-3">
            Eco-friendly
          </h3>
          <span className="text-gray-6">
            We use only the finest ingredients, and all our products undergo
            strict quality control measures to ensure excellence. Our goal is to
            create a unique blend of Indian and Western fragrances that
            highlight each individual's personality. Each of our perfumes
            contains a mixture of Indian herbs and world-class ingredients,
            resulting in a unique and memorable experience.
          </span>
        </div>
      </section>
      <section className="shadow container bg-white p-4 rounded-md flex lg:flex-row-reverse gap-10 justify-between flex-col items-center">
        <img
          src={pic2}
          alt="Quality"
          className="w-52 h-auto object-contain rounded"
        />
        <div className="w-full lg:text-left text-center p-6 ">
          <h3 className="text-xl md:text-2xl font-bold text-black mb-3">
            Innovation
          </h3>
          <span className="text-gray-6">
            We use only the finest ingredients, and all our products undergo
            strict quality control measures to ensure excellence. Our goal is to
            create a unique blend of Indian and Western fragrances that
            highlight each individual's personality. Each of our perfumes
            contains a mixture of Indian herbs and world-class ingredients,
            resulting in a unique and memorable experience.
          </span>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
