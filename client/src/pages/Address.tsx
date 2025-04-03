import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { AddressCard } from "@/components/Address/AddressCard";
import { AddressForm } from "../components/Address/AddressForm";
import { AddressType } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { getAddress } from "@/service/address";
import { useAuth } from "@/hook/AuthProvider";
import PerfumeLoader from "@/components/Loader/ModernLoader";
import { useNavigate } from "react-router";

export default function Address() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editAddress, setEditAddress] = useState<AddressType | null>(null);
  const { dbUser, isMutating } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isMutating && !dbUser) {
      navigate("/login");
    }
  }, [dbUser, isMutating, navigate]);

  const { data, isLoading } = useQuery({
    queryFn: () => getAddress({ uid: dbUser!.uid }),
    queryKey: ["address"],
  });

  if (isMutating || isLoading) {
    return <PerfumeLoader isLoading />;
  }

  if (!isLoading && !data) {
    navigate("/error");
  }

  return (
    <div className="min-h-screen bg-gray-05  p-4 md:p-8">
      <div className="max-w-6xl  mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-black">
            My Addresses
          </h1>

          {data && data.length > 0 && (
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-md  hover:cursor-pointer transition-colors"
            >
              <Plus size={20} />
              Add New Address
            </button>
          )}
        </div>

        {data && data.length === 0 ? (
          <div className="flex flex-col h-96 items-center shadow-lg justify-center py-16 px-4">
            <div className="w-16 h-16 bg-white rounded-full flex border-4 items-center justify-center mb-4">
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
              className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-md cursor-pointer transition-colors"
            >
              <Plus size={20} />
              Add New Address
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1  gap-6">
            {data?.map((address, index) => (
              <AddressCard
                key={index}
                address={address}
                onEdit={setEditAddress}
                isActive={false}
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
