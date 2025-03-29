import { useState } from "react";
import { FaEye, FaShoppingCart, FaHeart, FaRegHeart } from "react-icons/fa";
import "./style/product-card.css";
import { GetProduct } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { addItemToCart } from "@/service/cart";
import { useAuth } from "@/hook/AuthProvider";
import { Loader2 } from "lucide-react";

import { IoIosCheckmark } from "react-icons/io";
import { useCart } from "@/hook/CartProvider";

const ProductCard = ({
  data,
  setIsQuickView,
  setProduct,
  setShow,
  bestseller,
  gift,
  newTag,
  sale,
}: {
  data: GetProduct;
  setProduct: (e: GetProduct) => void;
  setIsQuickView: (e: boolean) => void;
  setShow: (e: boolean) => void;
  bestseller?: boolean;
  newTag?: boolean;
  sale?: boolean;
  gift?: boolean;
}) => {
  const [wishlist, setWishlist] = useState(false);

  const { dbUser } = useAuth();
  const { items, refetch } = useCart();

  const { mutate, status } = useMutation({
    mutationFn: addItemToCart,
    mutationKey: ["cart", data.id],
    onSuccess: () => refetch(),
  });

  const handleShow = (product: GetProduct): void => {
    setShow(false);
    setProduct(product);
    setTimeout(() => {
      setIsQuickView(true);
      setShow(true);
    }, 200);
  };

  return (
    <div className="card-container">
      <div className="card">
        {/* card img start container */}
        <div className="product-image-container">
          <img src={data.images[0]} className="card-img" alt={data.name} />

          <div className="top-left-tag-section">
            {bestseller && <div className="bestseller-tag"></div>}

            <div className="tag-items py-2">
              {newTag && <div className="tag-item-sale bg-blue-5!">New</div>}
              {sale && <p className="tag-item-sale">Sale</p>}
              {gift && <p className="tag-item-gift">Gift</p>}
            </div>
          </div>

          <div className="top-right-tag-section">
            <div className="floating-buttons-wrap">
              <div className="floating-buttons ">
                <button
                  className={`wishlist-btn icon-btn ${
                    wishlist ? "active" : ""
                  }`}
                  onClick={() => setWishlist(!wishlist)}
                >
                  {wishlist ? (
                    <FaHeart className="text-red-5" />
                  ) : (
                    <FaRegHeart />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="overlay">
            <button
              className="quick-view-2"
              onClick={(e) => {
                e.stopPropagation();
                handleShow(data);
              }}
            >
              <FaEye className="mt-1 quick-view-icon " />
              <p>Quick View</p>
            </button>
            {dbUser && (
              <button
                className="add-to-cart-2 items-center! disabled:!bg-slate-700 disabled:!text-white"
                onClick={() =>
                  mutate({ productId: data.id, qyt: 1, uid: dbUser.uid })
                }
                disabled={status === "pending" || items.includes(data.id)}
              >
                {items.includes(data.id) ? (
                  <>
                    <IoIosCheckmark size={25} /> Added to cart
                  </>
                ) : (
                  <>
                    {status == "pending" ? (
                      <>
                        <Loader2 size={20} className="animate-spin" /> Adding to
                        cart
                      </>
                    ) : (
                      <>
                        <FaShoppingCart className="mt-1" /> Add to Cart
                      </>
                    )}{" "}
                  </>
                )}
              </button>
            )}
          </div>
        </div>
        {/* card image container end  */}

        {/* card body start  */}

        <div className="card-body">
          <h3 className="card-title">{data.name}</h3>
          <p className="card-description">{data.description}</p>

          <div className="price-details">
            <span className="current-price">₹{Math.round(data.sellPrice)}</span>
            {data.maxPrice && data.maxPrice > data.sellPrice && (
              <>
                <span className="original-price">₹{data.maxPrice}</span>
                <span className="discount">
                  -{" "}
                  {Math.round(
                    ((data.maxPrice - data.sellPrice) / data.maxPrice) * 100
                  )}
                  % off
                </span>
              </>
            )}

            {dbUser && (
              <button
                className="buy-now-sm w-full mt-2"
                onClick={() =>
                  mutate({ productId: data.id, qyt: 1, uid: dbUser.uid })
                }
                disabled={status === "pending" || items.includes(data.id)}
              >
                {items.includes(data.id) ? (
                  <>Added to cart</>
                ) : (
                  <>
                    {status == "pending" ? (
                      <>
                        <Loader2 size={20} className="animate-spin" /> Adding to
                        cart
                      </>
                    ) : (
                      <>Add to Cart</>
                    )}{" "}
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* card body end  */}
      </div>
    </div>
  );
};

export default ProductCard;
