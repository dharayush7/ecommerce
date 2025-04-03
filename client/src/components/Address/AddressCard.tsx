import React, { useState } from "react";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import { SiTicktick } from "react-icons/si";
import { AddressType } from "@/lib/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { deleteAddress } from "@/service/address";
import { useAuth } from "@/hook/AuthProvider";
import { queryClient } from "@/main";

interface AddressCardProps {
  address: AddressType;
  isActive?: boolean;
  onEdit: (address: AddressType) => void;
}

export const AddressCard: React.FC<AddressCardProps> = ({
  address,
  isActive,
  onEdit,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { dbUser } = useAuth();
  const { mutate, status } = useMutation({
    mutationFn: deleteAddress,
    mutationKey: ["addAddress", address.id],
    onSuccess: () => {
      setIsOpen(false);
      queryClient.refetchQueries({
        queryKey: ["address"],
      });
    },
  });
  return (
    <div
      className={cn(
        "bg-white rounded-lg shadow-lg p-4 border-1 border-gray-3 relative hover:cursor-pointer",
        isActive && "bg-blue-1"
      )}
    >
      {isActive && (
        <SiTicktick size={24} className="absolute right-5 text-blue-5" />
      )}
      <div className="space-y-0 hover:cursor-text">
        <h3 className="text-xl font-bold">
          {address.firstName} {address.lastName}
        </h3>
        <p>{address.phoneNumber}</p>
        {address.alternatePhoneNumber && <p>{address.alternatePhoneNumber}</p>}
        <p className="text-black">{address.address1},</p>
        {address.address2 && <p className="text-black">{address.address2},</p>}
        {address.landmark && <p>Landmark - {address.landmark},</p>}

        <p className="text-black ">
          {address.city}, {address.state} -{" "}
          <span className="">{address.postCode}</span>
        </p>
        <p className="text-black">{address.country}</p>
      </div>

      <div className="flex gap-2 mt-2 justify-around sm:justify-end  sm:gap-6">
        <button
          onClick={() => onEdit(address)}
          className="flex items-center gap-1 px-4 py-2 bg-black text-white  cursor-pointer rounded-md transition-colors"
        >
          <Pencil size={18} />
          Edit
        </button>
        <AlertDialog open={isOpen}>
          <AlertDialogTrigger
            className="flex bg-red-5 text-white px-4 py-2  justify-between hover:bg-red-6 ease-in duration-150 rounded-md items-center cursor-pointer gap-1"
            onClick={() => setIsOpen(true)}
          >
            Delete
            <Trash2 size={18} />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action is permanent and cannot be undone. Once deleted,
                this address details will be lost, and you'll need to add a new
                one for future orders. Please confirm if you're sure!
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                className="cursor-pointer border-black"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-6 hover:bg-red-7 cursor-pointer"
                disabled={status == "pending"}
                onClick={() => mutate({ uid: dbUser!.uid, id: address.id })}
              >
                {status === "pending" && (
                  <Loader2 size={20} className="animate-spin" />
                )}
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};
