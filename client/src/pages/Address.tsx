import { useState } from "react";
import { Plus } from "lucide-react";
import { AddressCard } from "@/components/Address/AddressCard";
import { AddressForm } from "../components/Address/AddressForm";
import { AddressType } from "@/lib/types";
// import { DeleteConfirmation } from "../components/Address/DeleteConfirmation";

// Sample initial data
const initialAddresses: AddressType[] = [
  {
    firstName: "Aman",
    lastName: "Parihar",
    address1: "Mahiar bypass dilaura radha chauk satna",
    city: "Satna",
    postCode: "485001",
    state: "Madhya Pradesh",
    country: "India",
    phoneNumber: "1245448598",
    address2: "ygfi3gfierufg fjheifbiergf bfiergbfireb",
    landmark: "uiregiuerg",
    alternatePhoneNumber: "+69598989879879",
  },
  {
    firstName: "Ayusgd",
    lastName: "ebgr",
    address1: "Mabrtbrtura radha chauk satna",
    city: "Satna",
    postCode: "485001",
    state: "Madhya Pradesh",
    country: "India",
    phoneNumber: "1245448598",
    address2: "ygfi3gfierufg fjheifbiergf bfiergbfireb",
    landmark: "uiregiuerg",
    alternatePhoneNumber: "+69598989879879",
  },
];

export default function Address() {
  // const [addresses, _setAddresses] = useState<AddressType[]>(initialAddresses);
  const addresses = initialAddresses;
  const [showAddForm, setShowAddForm] = useState(false);
  const [editAddress, setEditAddress] = useState<AddressType | null>(null);

  return (
    <div className="min-h-screen bg-gray-05  p-4 md:p-8">
      <div className="max-w-6xl  mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-black">
            My Addresses
          </h1>

          {addresses.length > 0 && (
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-md  hover:cursor-pointer transition-colors"
            >
              <Plus size={20} />
              Add New Address
            </button>
          )}
        </div>

        {addresses.length === 0 ? (
          <div className="flex flex-col h-!96 items-center shadow-2xl  justify-center py-16 px-4">
            <div className="w-16 h-16 bg-gray-1 rounded-full flex  border-4 items-center justify-center mb-4">
              <Plus className="w-8 h-8 text-gray-4 " />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No addresses found
            </h2>
            <p className="text-gray-5 text-center mb-8">
              You haven't added any addresses yet. Add your first address to get
              started.
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-md  transition-colors"
            >
              <Plus size={20} />
              Add New Address
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1  gap-6">
            {addresses.map((address, index) => (
              <AddressCard
                key={index}
                address={address}
                onEdit={setEditAddress}
                isActive={index > 0}
              />
            ))}
          </div>
        )}

        {showAddForm && <AddressForm onClose={() => setShowAddForm(false)} />}

        {editAddress && (
          <AddressForm
            isEdit
            initialData={editAddress}
            onClose={() => setEditAddress(null)}
          />
        )}
      </div>
    </div>
  );
}
