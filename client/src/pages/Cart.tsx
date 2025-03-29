import { useEffect, useState } from "react";
import EmptyCart from "@/components/cart/EmptyCart";
import { Loader2, ShieldCheck } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/hook/AuthProvider";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCart, removeItemToCart, switchItem } from "@/service/cart";
import { useNavigate } from "react-router";
import PerfumeLoader from "@/components/Loader/ModernLoader";
import { queryClient } from "@/main";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hook/CartProvider";
import { calcTotal } from "@/lib/utils";
import CartCard from "@/components/cart/CartCard";
import { useToast } from "@/hook/use-toast";

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { dbUser, isMutating } = useAuth();
  const { refetch } = useCart();
  const { toast } = useToast();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isMutating && !dbUser) {
      navigate("/login");
    }
  }, [dbUser, isMutating, navigate]);

  const { data, isError, isSuccess, isLoading } = useQuery({
    queryFn: () => getCart({ uid: dbUser!.uid }),
    queryKey: ["cart"],
  });

  const { mutate: switchI } = useMutation({
    mutationFn: switchItem,
    mutationKey: ["switch"],
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });

  const { mutate: remove, status: isRemoving } = useMutation({
    mutationFn: removeItemToCart,
    mutationKey: ["remove"],
    onSuccess() {
      setIsOpen(false);
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
      refetch();
    },
  });

  if (isLoading || isMutating) {
    return <PerfumeLoader isLoading />;
  }

  if (!data || isError || !isSuccess) {
    return <></>;
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center bg-gray-1 px-8 md:px-16 space-y-5 pt-3 pb-7">
        <div className="container mt-2">
          {data.filter((e) => !e.isSaveForLater).length == 0 ? (
            <EmptyCart />
          ) : (
            <div>
              <div className="flex flex-col lg:flex-row gap-6 mt-2">
                {/* Left Section - Product List */}
                <div className="w-full lg:w-2/3 bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-2xl font-semibold mb-4 text-center">
                    My Cart
                  </h2>

                  {/* Product Card */}
                  {data.map((item) => {
                    if (item.isSaveForLater) return;
                    return <CartCard item={item} key={item.productId} />;
                  })}
                </div>

                {/* Right Section - Price Details */}
                <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold mb-4">Price Details</h2>

                  <div className="space-y-2 text-gray-7">
                    <div className="flex justify-between">
                      <span>
                        Price ({data.filter((e) => !e.isSaveForLater).length})
                      </span>
                      <span>
                        &#8377;
                        {calcTotal(
                          data
                            .filter((e) => !e.isSaveForLater)
                            .map((e) => e.product.maxPrice * e.quantity)
                        ).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-green-6">
                      <span>Discount</span>
                      <span>
                        -&#8377;
                        {(
                          calcTotal(
                            data
                              .filter((e) => !e.isSaveForLater)
                              .map((e) => e.product.maxPrice * e.quantity)
                          ) -
                          calcTotal(
                            data
                              .filter((e) => !e.isSaveForLater)
                              .map((e) => e.product.sellPrice * e.quantity)
                          )
                        ).toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Delivery Charges</span>
                      <span className="text-green-6">Free</span>
                    </div>
                    <hr className="my-2 text-gray-3" />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total Amount</span>
                      <span>
                        &#8377;
                        {calcTotal(
                          data
                            .filter((e) => !e.isSaveForLater)
                            .map((e) => e.product.sellPrice * e.quantity)
                        ).toFixed(2)}
                      </span>
                    </div>
                    <p className="text-green-6 text-sm">
                      You will save &#8377;
                      {(
                        calcTotal(
                          data
                            .filter((e) => !e.isSaveForLater)
                            .map((e) => e.product.maxPrice)
                        ) -
                        calcTotal(
                          data
                            .filter((e) => !e.isSaveForLater)
                            .map((e) => e.product.sellPrice)
                        )
                      ).toFixed(2)}{" "}
                      on this order
                    </p>
                  </div>

                  {/* Place Order Button */}
                  <button
                    className="mt-6 inline-block w-full py-2 text-lg rounded-lg transition bg-black hover:bg-gray-8 ease-in duration-200 text-white cursor-pointer"
                    onClick={() =>
                      toast({
                        description:
                          "Some features are blocked in demo mode. Please explore the available options and get a feel for the site!",
                        title: "Demo Mode",
                      })
                    }
                  >
                    Place Order
                  </button>

                  {/* Secure Payment Info */}
                  <p className="text-gray-500 text-xs mt-3 flex items-center justify-center gap-2">
                    <ShieldCheck className="text-green-6" />
                    Safe and Secure Payments. Easy Returns. 100% Authentic
                    products.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="container bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">
            Saved For Later ({data.filter((e) => e.isSaveForLater).length})
          </h3>
          {data.map((e) => {
            if (!e.isSaveForLater) return;
            return (
              <div
                className="border-b border-b-gray-3 py-5 flex flex-col md:flex-row items-center justify-between"
                key={e.productId}
              >
                <div className="flex flex-col md:flex-row items-center gap-4">
                  {/* Product Image */}
                  <div className="w-28 h-28 bg-gray-3 rounded-md flex justify-center items-center">
                    <img
                      className="w-full h-full object-cover rounded-md"
                      src={e.product.images[0].url}
                      alt="Product"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="w-full flex flex-col">
                    <p className="font-medium">{e.product.name}</p>
                    <p className="text-sm text-gray-5">
                      {e.product.description}
                    </p>
                    {/* <p className="text-sm text-gray-5">
                      Seller: AjantaFootcare
                    </p> */}
                    <div className="w-full flex items-center gap-2">
                      <span className="text-gray-4 text-sm line-through">
                        &#8377;{e.product.maxPrice}
                      </span>
                      <span className="text-black font-semibold">
                        &#8377;{e.product.sellPrice}
                      </span>
                      <span className="text-sm text-green-6">2% Off</span>
                    </div>
                  </div>
                </div>

                {/* Save & Remove Buttons */}
                <div className="flex w-full px-4 pt-2 md:justify-end  justify-evenly gap-4 mt-2 md:mt-0">
                  <button
                    className="text-gray-6 hover:bg-gray-2 px-3 py-1 rounded ease-in duration-300 cursor-pointer"
                    onClick={() =>
                      switchI({ productId: e.productId, uid: dbUser!.uid })
                    }
                  >
                    Move to cart
                  </button>
                  <AlertDialog open={isOpen}>
                    <AlertDialogTrigger
                      className="text-red-5 hover:bg-red-2 px-3 py-1 rounded ease-in duration-300 cursor-pointer"
                      onClick={() => setIsOpen(true)}
                    >
                      Remove
                      {/* <Trash2 size={18} /> */}
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Oops! Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This item is about to vanish from your cart. Once it's
                          gone, there's no going back. Are you sure you want to
                          remove it?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel
                          className="cursor-pointer border-black"
                          onClick={() => setIsOpen(false)}
                          disabled={isRemoving == "pending"}
                        >
                          Cancel
                        </AlertDialogCancel>
                        <Button
                          className="cursor-pointer"
                          variant="destructive"
                          onClick={() =>
                            remove({
                              uid: dbUser!.uid,
                              productId: e.productId,
                            })
                          }
                          disabled={isRemoving === "pending"}
                        >
                          {isRemoving === "pending" && (
                            <Loader2 size={20} className="animate-spin" />
                          )}
                          Delete
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            );
          })}
          {/* Product Card */}
        </div>
      </div>
    </>
  );
};

export default CartPage;
