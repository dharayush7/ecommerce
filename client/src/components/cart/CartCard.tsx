import { CartCardProps } from "@/lib/types";
import { queryClient } from "@/main";
import {
  decrementItem,
  incrementItem,
  removeItemToCart,
  switchItem,
} from "@/service/cart";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import { useAuth } from "@/hook/AuthProvider";
import { useCart } from "@/hook/CartProvider";

export default function CartCard({ item }: { item: CartCardProps }) {
  const navigate = useNavigate();
  const { dbUser, isMutating } = useAuth();
  const { refetch } = useCart();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isMutating && !dbUser) {
      navigate("/login");
    }
  }, [dbUser, isMutating, navigate]);

  const { mutate: increase, status: isIncreasing } = useMutation({
    mutationFn: incrementItem,
    mutationKey: ["increase"],
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });

  const { mutate: decrease, status: isDecreasing } = useMutation({
    mutationFn: decrementItem,
    mutationKey: ["decrease"],
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
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
  return (
    <div
      key={item.productId}
      className="w-full border-b border-b-gray-3 py-5 flex flex-col md:flex-row items-center justify-between"
    >
      <div className="w-full flex items-center flex-col md:flex-row gap-4">
        {/* Product Image */}
        <div className=" h-28 bg-white rounded-md flex justify-center items-center">
          <img
            className="w-34 h-auto object-contain rounded-md"
            src={item.product.images[0].url}
            alt="Product"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col w-full mt-2">
          <p className="font-medium">{item.product.name}</p>
          <p className="text-sm text-gray-5">{item.product.description}</p>
          {/* <p className="text-sm text-gray-5">
                            Seller: AjantaFootcare
                          </p> */}

          {/* Price & Discount */}
          <div className="flex items-center gap-2 mt-2">
            <span className="text-gray-600 text-sm line-through">
              &#8377;{item.product.maxPrice}
            </span>
            <span className="text-black font-semibold">
              &#8377;{item.product.sellPrice}
            </span>
            <span className="text-xs text-green-6">
              {Number.parseInt(
                `${
                  ((item.product.maxPrice - item.product.sellPrice) /
                    item.product.maxPrice) *
                  100
                }`
              )}
              %
            </span>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-2 mt-2">
            <button
              className="px-2 py-2 border cursor-pointer rounded disabled:bg-gray-2"
              title="minus"
              disabled={
                item.quantity == 1 ||
                isIncreasing === "pending" ||
                isDecreasing === "pending"
              }
              onClick={() =>
                decrease({
                  uid: dbUser!.uid,
                  productId: item.productId,
                })
              }
            >
              <Minus size={18} />
            </button>
            <span className="px-3">{item.quantity}</span>
            <button
              className="px-2 py-2 border rounded cursor-pointer disabled:bg-gray-2"
              title="plus"
              disabled={
                isDecreasing === "pending" || isIncreasing === "pending"
              }
              onClick={() =>
                increase({
                  uid: dbUser!.uid,
                  productId: item.productId,
                })
              }
            >
              <Plus size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Save & Remove Buttons */}
      <div className="flex w-full px-4 pt-2 md:justify-end  justify-evenly gap-4 mt-2 md:mt-0">
        <button
          className="text-gray-6 hover:bg-gray-2 px-3 py-1 rounded ease-in duration-300 cursor-pointer"
          onClick={() =>
            switchI({
              productId: item.productId,
              uid: dbUser!.uid,
            })
          }
        >
          Save for Later
        </button>
        <AlertDialog open={isOpen}>
          <AlertDialogTrigger
            className="text-red-500 hover:bg-red-200  px-3 py-1 rounded ease-in duration-300 cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            Remove
            {/* <Trash2 size={18} /> */}
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Oops! Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This item is about to vanish from your cart. Once it's gone,
                there's no going back. Are you sure you want to remove it?
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
                    productId: item.productId,
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
}
