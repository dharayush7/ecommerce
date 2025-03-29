import { GetProduct } from "@/lib/types";
import "./style/offcanvas.css";
import { Link } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { addItemToCart } from "@/service/cart";
import { useAuth } from "@/hook/AuthProvider";
import { Loader2 } from "lucide-react";
import { useCart } from "@/hook/CartProvider";

interface OffcanvasProductProps {
  product: GetProduct;
  show: boolean;
  handleClose: () => void;
  isQuickView: boolean;
}

const OffcanvasProduct2: React.FC<OffcanvasProductProps> = ({
  product,
  show,
  handleClose,
  isQuickView,
}) => {
  const { dbUser } = useAuth();
  const { items, refetch } = useCart();

  const { mutate, status } = useMutation({
    mutationFn: addItemToCart,
    mutationKey: ["cart", product.id],
    onSuccess: () => refetch(),
  });

  return (
    <div className={`offcanvas ${show ? "show" : ""}`}>
      <div className="offcanvas-header">
        <h2 className="offcanvas-tittle">
          {isQuickView ? "Product Details" : "Cart Summary"}
        </h2>
        <button className="close-btn" onClick={handleClose}>
          ×
        </button>
      </div>
      <div className="offcanvas-body">
        <img
          src={product.images[0]}
          alt={product.name}
          className="product-image2 object-contain!"
        />
        <h3 className="product-name">{product.name}</h3>

        <>
          <div className="price-details">
            {product.maxPrice > product.sellPrice ? (
              <>
                <span className="current-price">
                  ₹{Math.round(product.sellPrice)}
                </span>{" "}
                <span className="original-price">₹{product.maxPrice}</span>
                <span className="discount">
                  -
                  {Math.round(
                    ((product.maxPrice - product.sellPrice) /
                      product.maxPrice) *
                      100
                  )}
                  % off
                </span>
              </>
            ) : (
              <span className="current-price">₹{product.sellPrice}</span>
            )}
          </div>

          <p className="product-description">{product.description}</p>

          {dbUser && (
            <button
              className="add-to-cart disabled:!bg-slate-600 !flex !items-center justify-center! gap-2"
              disabled={status === "pending" || items.includes(product.id)}
              onClick={() =>
                mutate({ uid: dbUser.uid, productId: product.id, qyt: 1 })
              }
            >
              {items.includes(product.id) ? (
                <>Added to cart</>
              ) : (
                <>
                  {status === "pending" ? (
                    <>
                      <Loader2 size={20} className=" animate-spin" /> Adding to
                      cart
                    </>
                  ) : (
                    <>Add to cart</>
                  )}
                </>
              )}
            </button>
          )}

          <Link to={`/product/${product.id}`}>
            <button className="buy-now" onClick={handleClose}>
              View more
            </button>
          </Link>

          <div className="product-info">
            <p>
              <strong>Availability:</strong> In Stock
            </p>
            <p className="space-x-1">
              <strong>Categories:</strong>
              {product.tags.map((e) => {
                return <span key={e.id}>{e.name}</span>;
              })}
            </p>
          </div>
        </>
      </div>
    </div>
  );
};

export default OffcanvasProduct2;
