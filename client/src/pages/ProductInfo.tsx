import insta from "@/assets/productDeatils/instagram.png";
import whatsapp from "@/assets/productDeatils/whatsapp.png";
import facebook from "@/assets/productDeatils/facebook.png";
import copy from "@/assets/productDeatils/circle.png";
import { useEffect, useState } from "react";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import OffcanvasProduct2 from "@/components/card/offcavass";
import { GetProduct } from "@/lib/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { productGet } from "@/service/product";
import { useNavigate, useParams } from "react-router";
import ProductCard from "@/components/card/ProductCard";
import { shareOnWhatsApp } from "@/lib/utils";
import { FacebookShareButton, InstapaperShareButton } from "react-share";
import PerfumeLoader from "@/components/Loader/ModernLoader";
import { useAuth } from "@/hook/AuthProvider";
import { addItemToCart } from "@/service/cart";
import { IoIosCheckmark } from "react-icons/io";
import { Loader2 } from "lucide-react";
import { useCart } from "@/hook/CartProvider";
import ErrorPage from "./Error";

export default function ProductInfo() {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVNer1ZryNxWVXojlY9Hoyy1-4DVNAmn7lrg&s"
  );
  const [product, setProduct] = useState<GetProduct | null>(null);
  const [show, setShow] = useState(false);
  const [isQuickView, setIsQuickView] = useState(false);

  const { items, refetch } = useCart();
  const { isMutating, dbUser } = useAuth();

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!params.id) navigate("/error");
  }, [navigate, params.id]);

  const { data, isLoading, isError } = useQuery({
    queryFn: () => productGet(params.id!),
    queryKey: ["product", params.id!],
  });
  useEffect(() => {
    if (!isLoading && !isError && data) {
      setSelectedImage(data.data.product.images[0].url);
    }
  }, [data, isError, isLoading]);

  const { mutate, status } = useMutation({
    mutationFn: addItemToCart,
    mutationKey: ["cart", data?.data.product.id],
    onSuccess: () => refetch(),
  });

  if (isLoading) {
    return <PerfumeLoader isLoading />;
  }

  if (!data) {
    return <ErrorPage />;
  }

  if (isError) {
    navigate("/error");
    return;
  }

  return (
    <>
      <div className="w-full px-2 py-8 border border-primary">
        <div className="flex items-center space-x-2 text-white text-sm py-3 px-6 bg-slate-900">
          <a href="/" className="hover:text-gray-2">
            Home
          </a>
          <span>/</span>
          <a href="/new-arrivals" className="hover:text-gray-2">
            {data.data.product.productOnCategories[0].category.name}
          </a>
          <span>/</span>
          <span className="text-gray-2 truncate max-w-[200px] sm:max-w-[300px] md:max-w-none">
            {data.data.product.name}
          </span>
        </div>

        <div className="flex flex-col md:flex-row justify-center mt-3 ">
          <div className="flex w-full flex-col lg:flex-row items-center justify-center md:justify-evenly h-min mt-14  md:flex-col-reverse ">
            {/* Thumbnail Images for Mobile and Desktop */}
            <div className="hidden md:flex md:text-start px-1 py-1  lg:flex-col overflow-x-auto space-x-2 scroll-mx-1 h-5 md:h-auto  gap-2 mt-5">
              {data.data.product.images.map((img, index) => (
                <img
                  key={index}
                  src={img.url}
                  alt="Thumbnail"
                  className={`w-32 h-32 cursor-pointer transition  object-contain duration-300 rounded-sm ${
                    selectedImage === img.url
                      ? "border-gray-900"
                      : "border-gray-3"
                  }`}
                  onClick={() => setSelectedImage(img.url)}
                />
              ))}
            </div>

            {/* Selected Image */}
            <div className="flex w-full sm:max-w-[35vw] lg:py-1 px-4">
              <img
                src={selectedImage}
                alt="Product"
                className="w-full rounded-lg object-cover py-"
              />
            </div>
          </div>

          {/* Thumbnail Images for Mobile (Horizontal Scrolling) */}
          <div className="md:hidden flex justify-start mt-10 overflow-x-auto space-x-2 scroll-mx-1 pl-4">
            {data.data.product.images.map((img, index) => (
              <img
                key={index}
                src={img.url}
                alt="Thumbnail"
                className={`w-36 h-36 cursor-pointer transition object-contain duration-300  rounded-sm ${
                  selectedImage === img.url
                    ? "border-gray-900"
                    : "border-gray-3"
                }`}
                onClick={() => setSelectedImage(img.url)}
              />
            ))}
          </div>

          {/* Product Details Section */}
          <div className="py-5 w-full mt-8 px-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              {data.data.product.name}
            </h1>

            {/* Star Ratings */}
            <div className="flex items-center mt-2 justify-between">
              <div className="flex">
                {[...Array(4)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-500" />
                ))}
                <FaStar className="text-gray-3" />
              </div>

              {/* Social Icons */}
              <ul className="flex gap-2 cursor-pointer object-contain">
                <li className="w-7 object-contain">
                  <InstapaperShareButton
                    url={`${window.location.origin}/products/${data.data.product.id}`}
                  >
                    <img src={insta} alt="instagram" />
                  </InstapaperShareButton>
                </li>
                <li className="w-7 object-contain">
                  <button
                    onClick={() =>
                      shareOnWhatsApp(
                        data.data.product.id,
                        data.data.product.name
                      )
                    }
                    className="cursor-pointer"
                  >
                    <img src={whatsapp} alt="whatsapp" />
                  </button>
                </li>
                <li className="w-7 object-contain">
                  <FacebookShareButton
                    url={`${window.location.origin}/products/${data.data.product.id}`}
                  >
                    <img src={facebook} alt="facebook" />
                  </FacebookShareButton>
                </li>
                <li className="w-7 object-contain">
                  <button
                    className="cursor-pointer"
                    onClick={() =>
                      navigator.clipboard.writeText(
                        `${window.location.origin}/products/${data.data.product.id}`
                      )
                    }
                  >
                    <img src={copy} alt="copy" />
                  </button>
                </li>
              </ul>
            </div>

            {/* Product Description */}

            <p className="mt-4 text-grey-6">{data.data.product.description}</p>

            {/* Pricing Section */}
            <div className="mt-4">
              <span className="text-2xl font-bold text-gray-900">
                Rs. {data.data.product.sellPrice}
              </span>
              <p className="text-sm text-gray-5 line-through">
                Rs. {data.data.product.maxPrice}
              </p>
              <p className="text-green-6 font-semibold mt-2">In stock</p>
            </div>

            {/* Quantity Selector */}
            {dbUser && !items.includes(data.data.product.id) && (
              <div className="mt-4 flex items-center space-x-4">
                <button
                  title="minus"
                  className="p-2 border rounded-md bg-gray-1 hover:bg-gray-2"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <AiOutlineMinus />
                </button>
                <span className="text-lg font-semibold">{quantity}</span>
                <button
                  title="plus"
                  className="p-2 border rounded-md bg-gray-1 hover:bg-gray-2"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <AiOutlinePlus />
                </button>
              </div>
            )}

            {/* Add to Cart Button */}
            {dbUser && (
              <button
                className="mt-6 w-full bg-black text-white py-2.5 rounded-md flex justify-center items-center gap-2 hover:bg-gray-8 disabled:bg-slate-500 disabled:text-white"
                onClick={() =>
                  mutate({
                    uid: dbUser.uid,
                    productId: data.data.product.id,
                    qyt: quantity,
                  })
                }
                disabled={
                  status === "pending" || items.includes(data.data.product.id)
                }
              >
                {items.includes(data.data.product.id) ? (
                  <>
                    <IoIosCheckmark size={30} /> Added to cart
                  </>
                ) : (
                  <>
                    {status === "pending" ? (
                      <>
                        <Loader2 className="animate-spin" /> Adding to cart
                      </>
                    ) : (
                      <>
                        <FaShoppingCart /> Add to Cart
                      </>
                    )}
                  </>
                )}
              </button>
            )}

            {/* Product Information */}
            <div className="p-6 mt-5">
              <Accordion type="single" collapsible className=" ">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="font-semibold text-xl hover:decoration-transparent decoration-transparent">
                    Description2
                  </AccordionTrigger>
                  <AccordionContent className="text-sm rounded-none">
                    <p>{data.data.product.description2}</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="font-semibold text-xl hover:decoration-transparent decoration-transparent ">
                    Qualities
                  </AccordionTrigger>
                  <AccordionContent className="rounded-none">
                    <p>
                      * <strong>Fragrence:</strong>{" "}
                      {data.data.product.fragrence}
                    </p>
                    <p>
                      * <strong>Preference:</strong>{" "}
                      {data.data.product.preference}
                    </p>
                    <p>
                      * <strong>Strength:</strong> {data.data.product.strength}
                    </p>
                    <p>
                      * <strong>Sustainable:</strong>{" "}
                      {data.data.product.sustainable}
                    </p>
                    <p>
                      * <strong>Type:</strong> {data.data.product.type}
                    </p>
                    <p>
                      * <strong>Quantity:</strong> {data.data.product.quantity}{" "}
                      ml
                    </p>
                    <p>
                      * <strong>Ideal For:</strong> {data.data.product.idealFor}
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="font-semibold text-xl hover:decoration-transparent decoration-transparent">
                    Points
                  </AccordionTrigger>
                  <AccordionContent className="rounded-none">
                    <p>
                      {data.data.product.points.map((e) => (
                        <p key={e}>* {e}</p>
                      ))}
                    </p>
                  </AccordionContent>
                </AccordionItem>
                {/* <AccordionItem value="item-4">
                <AccordionTrigger className="font-semibold text-xl hover:decoration-transparent decoration-transparent">
                  Is it accessible?
                </AccordionTrigger>
                <AccordionContent className="rounded-none">
                  <p>
                    * <strong>Longevity & Lasting:</strong> 1-2 hrs of strong
                    projection, 4-6 hrs of sillage, and 5-10 hrs close to skin.
                    Performance depends on notes, skin type, weather, and
                    exposure.
                  </p>
                </AccordionContent>
              </AccordionItem> */}
              </Accordion>
            </div>
          </div>
        </div>
        <div className="  mt-14">
          <h1 className="text-center text-4xl font-extrabold mb-14">
            Suggested Products
          </h1>
          <div
            className="scale-100 flex flex-nowrap overflow-x-scroll pb-3
          overflow-hidden h-full space-x-4 md:space-x-6 pl-7"
          >
            {data.data.suggestedProduct.map((product, id) => (
              <ProductCard
                data={product}
                setIsQuickView={setIsQuickView}
                setProduct={setProduct}
                setShow={setShow}
                key={id}
              />
            ))}
          </div>
        </div>
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
