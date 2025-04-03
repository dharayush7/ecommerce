import { useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import IntroCarousel from "@/components/Home/IntroCarousel";
import Hero3 from "@/components/HeroSections/Hero3";
import { Hero4 } from "@/components/HeroSections/Hero4";
import Hero2 from "@/components/HeroSections/Hero2";
import Hero5 from "@/components/HeroSections/Hero5";
import Hero1 from "@/components/HeroSections/Hero1";
import ScrollToTop from "@/components/Home/ScrollToTop";
import { NewArribles } from "@/components/Home/NewArrival";
import OffcanvasProduct2 from "@/components/card/offcavass";
import { GetProduct } from "@/lib/types";
import { BestSellers } from "@/components/Home/BestSellers";
import { GiftPacks } from "@/components/Home/GiftPacks";
import { Categories } from "@/components/Home/Categories";
import { useQuery } from "@tanstack/react-query";
import { homeGet } from "@/service/home";
import PerfumeLoader from "@/components/Loader/ModernLoader";
import { useAuth } from "@/hook/AuthProvider";

export default function Home() {
  const [product, setProduct] = useState<GetProduct | null>(null);
  const [show, setShow] = useState(false);
  const [isQuickView, setIsQuickView] = useState(false);
  const [newArriblesProducts, setNewArriblesProducts] = useState<GetProduct[]>(
    []
  );
  const [bestSellersProducts, setBestSellersProducts] = useState<GetProduct[]>(
    []
  );
  const [giftPacksProducts, setGiftPacksProducts] = useState<GetProduct[]>([]);

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const { data, isLoading, isError, error } = useQuery({
    queryFn: homeGet,
    queryKey: ["home"],
  });

  const { isMutating } = useAuth();

  useEffect(() => {
    if (!isLoading && !isError && data) {
      const newArrivalsId = "cm8ofllaz00021fpp79dgkufl";
      const bestSellersId = "cm8ofllau00001fpp69owa2p6";
      const giftPacksId = "cm8ofllb000031fpp95ukmnud";

      const newArriblesProducts = data.data.products.filter((e) =>
        e.tags.find((e) => e.id == newArrivalsId)
      );
      setNewArriblesProducts(newArriblesProducts);

      const bestSellersProducts = data.data.products.filter((e) =>
        e.tags.find((e) => e.id == bestSellersId)
      );
      setBestSellersProducts(bestSellersProducts);

      const giftPacksProducts = data.data.products.filter((e) =>
        e.tags.find((e) => e.id == giftPacksId)
      );
      setGiftPacksProducts(giftPacksProducts);
    }
  }, [data, error, isError, isLoading]);

  return (
    <>
      <div className="w-full relative">
        <IntroCarousel />
        <Hero3 />
        <Categories />

        <Hero4 />
        <NewArribles
          data={newArriblesProducts}
          setIsQuickView={setIsQuickView}
          setProduct={setProduct}
          setShow={setShow}
        />
        <Hero2 />
        <BestSellers
          data={bestSellersProducts}
          setIsQuickView={setIsQuickView}
          setProduct={setProduct}
          setShow={setShow}
        />
        <Hero5 />
        <GiftPacks
          data={giftPacksProducts}
          setIsQuickView={setIsQuickView}
          setProduct={setProduct}
          setShow={setShow}
        />
        <Hero1
          title="Discover Luxury Fragrances"
          subtitle="Explore our exclusive collection of perfumes."
          buttonText="Shop Now"
          buttonLink="products/bvlgari-man-in-black-parfum-for-men-100ml.html"
          imageUrl="https://t3.ftcdn.net/jpg/02/57/81/58/360_F_257815846_MuFjgEW2J5Ak67QZblNjdStccsK43KUG.jpg"
          altText="Bvlgari Man in Black Parfum"
        />
        <ScrollToTop />
        {product && (
          <OffcanvasProduct2
            product={product}
            show={show}
            handleClose={() => {
              setProduct(null);
            }}
            isQuickView={isQuickView}
          />
        )}
      </div>
      <PerfumeLoader isLoading={isLoading || isMutating} />
    </>
  );
}
