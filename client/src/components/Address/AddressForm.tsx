import React, { useEffect, useState } from "react";
// import { Address } from "../../typs/address";
import stateCityData from "@/data/stateCityData.json";
import { Loader2, X } from "lucide-react";
import { AddressType, StateCityDataType } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { addAddress, updateAddress } from "@/service/address";
import { useAuth } from "@/hook/AuthProvider";
import { useNavigate } from "react-router";
import { queryClient } from "@/main";

interface AddressFormProps {
  isEdit?: boolean;
  initialData?: AddressType;
  onClose: () => void;
}

export const AddressForm: React.FC<AddressFormProps> = ({
  isEdit = false,
  initialData,
  onClose,
}) => {
  const blankData: Omit<AddressType, "id"> = {
    address1: "",
    city: "",
    country: "India",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    postCode: "",
    state: "",
    address2: "",
    alternatePhoneNumber: "",
    landmark: "",
  };
  const [formData, setFormData] = useState<Omit<AddressType, "id">>(
    initialData || blankData
  );
  const [state, setState] = useState<keyof StateCityDataType | null>(
    (initialData?.state || null) as keyof StateCityDataType | null
  );

  const navigate = useNavigate();
  const { dbUser, isMutating } = useAuth();

  useEffect(() => {
    if (!isMutating && !dbUser) {
      navigate("/login");
    }
  }, [dbUser, isMutating, navigate]);

  const { mutate: addAddressMutation, status: addAddressStatus } = useMutation({
    mutationFn: addAddress,
    mutationKey: ["address"],
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["address"],
      });
      onClose();
    },
  });

  const { mutate: updateAddressMutation, status: updateAddressStatus } =
    useMutation({
      mutationFn: updateAddress,
      mutationKey: ["adddress", initialData?.id],
      onSuccess: () => {
        queryClient.refetchQueries({
          queryKey: ["address"],
        });
        onClose();
      },
    });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEdit && initialData) {
      updateAddressMutation({
        uid: dbUser!.uid,
        data: {
          ...formData,
          id: initialData.id,
        },
      });
    } else {
      addAddressMutation({ uid: dbUser!.uid, data: formData });
    }
  };

  return (
    <div className="fixed inset-0 bg-[#000]/30  bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-semibold">
            {isEdit ? "Edit Address" : "Add New Address"}
          </h2>
          <button
            title="close"
            onClick={onClose}
            className="text-gray-5 hover:text-gray-7 hover:cursor-pointer"
          >
            <X size={25} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                className="block text-sm font-medium text-gray-7"
                htmlFor="firstName"
              >
                First Name <span className="text-red-5">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                required
                className="mt-1 block w-full p-2 border-1 rounded-md border-gray-3 shadow- focus:border-blue-6 focus:ring-blue-5"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-7"
                htmlFor="lastName"
              >
                Last Name <span className="text-red-5">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                required
                className="mt-1 p-2 block border-1 w-full rounded-md border-gray-3 shadow-sm focus:border-blue-5 focus:ring-blue-5"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                className="block text-sm font-medium text-gray-7"
                htmlFor="phoneNumber"
              >
                Phone Number <span className="text-red-5">*</span>
              </label>
              <input
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                className="mt-1 block w-full p-2 border-1 rounded-md border-gray-3 shadow-sm focus:border-blue-5 focus:ring-blue-5"
                required
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-7"
                htmlFor="alternatePhoneNumber"
              >
                Alternate Phone Number
              </label>
              <input
                type="text"
                name="alternatePhoneNumber"
                id="alternatePhoneNumber"
                className="mt-1 block p-2 w-full  border-1 rounded-md border-gray-3 shadow-sm focus:border-blue-5 focus:ring-blue-5"
                value={formData.alternatePhoneNumber}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    alternatePhoneNumber: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-7"
              htmlFor="address1"
            >
              Address Line 1 <span className="text-red-5">*</span>
            </label>
            <input
              type="text"
              name="address1"
              id="address1"
              required
              className="mt-1 block w-full  border-1 p-2 rounded-md border-gray-3 shadow-sm focus:border-blue-5 focus:ring-blue-5"
              value={formData.address1}
              onChange={(e) =>
                setFormData({ ...formData, address1: e.target.value })
              }
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-7"
              htmlFor="address2"
            >
              Address Line 2
            </label>
            <input
              type="text"
              name="address2"
              id="address2"
              className="mt-1 block w-full p-2 border-1 rounded-md border-gray-3 shadow-sm focus:border-blue-5 focus:ring-blue-5"
              value={formData.address2 || ""}
              onChange={(e) =>
                setFormData({ ...formData, address2: e.target.value })
              }
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-7"
              htmlFor="landmark"
            >
              Landmark
            </label>
            <input
              type="text"
              name="landmark"
              id="landmark"
              className="mt-1 block p-2 w-full  border-1 rounded-md border-gray-3 shadow-sm focus:border-blue-5 focus:ring-blue-5"
              value={formData.landmark}
              onChange={(e) =>
                setFormData({ ...formData, landmark: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                className="block text-sm font-medium text-gray-7"
                htmlFor="country"
              >
                Country <span className="text-red-5">*</span>
              </label>
              <select
                name="country"
                id="country"
                required
                className="mt-1 block w-full rounded-md border-1 p-2 border-gray-3 shadow-sm focus:border-blue-5 focus:ring-blue-5"
                value={"India"}
                onChange={() => {}}
              >
                <option value="India">India</option>
              </select>
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-7"
                htmlFor="state"
              >
                State <span className="text-red-5">*</span>
              </label>
              <select
                name="state"
                id="state"
                required
                className="mt-1 max-h-[70vh] block border-1 p-2 w-full rounded-md border-gray-3 shadow-sm focus:border-blue-5 focus:ring-blue-5"
                value={formData.state}
                onChange={(e) => {
                  setState(e.target.value as keyof StateCityDataType);
                  setFormData({ ...formData, state: e.target.value });
                }}
              >
                <option value="">Select State</option>
                {Object.keys(stateCityData).map((e, index) => (
                  <option value={e} key={index}>
                    {e}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <div>
              <label
                className="block text-sm font-medium text-gray-7"
                htmlFor="city"
              >
                City <span className="text-red-5">*</span>
              </label>
              <select
                name="city"
                id="city"
                required
                className="mt-1 max-h-[70vh] block border-1 p-2 w-full rounded-md border-gray-3 shadow-sm focus:border-blue-5 focus:ring-blue-5"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
              >
                <option value="">Select State</option>
                {state && (
                  <>
                    {stateCityData[state]?.map((e, index) => (
                      <option value={e} key={index}>
                        {e}
                      </option>
                    ))}
                  </>
                )}
              </select>
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-7"
                htmlFor="postCode"
              >
                Post Code <span className="text-red-5">*</span>
              </label>
              <input
                type="text"
                name="postCode"
                id="postCode"
                required
                className="mt-1 block w-full  border-1 p-2 rounded-md border-gray-3 shadow-sm focus:border-blue-5 focus:ring-blue-5"
                value={formData.postCode}
                onChange={(e) =>
                  setFormData({ ...formData, postCode: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-white bg-red-5  rounded-md transition-colors hover:cursor-pointer disabled:bg-red-300"
              disabled={
                addAddressStatus === "pending" ||
                updateAddressStatus === "pending"
              }
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-black  rounded-md transition-colors hover:cursor-pointer flex justify-center items-center gap-2 disabled:bg-zinc-700
              "
              disabled={
                addAddressStatus === "pending" ||
                updateAddressStatus === "pending"
              }
            >
              {(addAddressStatus === "pending" ||
                updateAddressStatus === "pending") && (
                <Loader2 size={20} className="animate-spin" />
              )}
              {isEdit ? "Save Changes" : "Add Address"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
