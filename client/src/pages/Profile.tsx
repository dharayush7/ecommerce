import React, { useEffect, useState } from "react";
import { Loader2, X } from "lucide-react";
import { Edit } from "lucide-react";
import { useAuth } from "@/hook/AuthProvider";
import { useNavigate } from "react-router";
import PerfumeLoader from "@/components/Loader/ModernLoader";
import { useMutation } from "@tanstack/react-query";
import { profileUpdate } from "@/service/profile";
import { useToast } from "@/hook/use-toast";

interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

const ProfileEditPage: React.FC = () => {
  const { dbUser, isMutating, refetch } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [popupData, setPopupData] = useState({
    firstName: formData.firstName,
    email: formData.email,
    lastName: formData.lastName,
    phone: formData.phone,
  });

  const { toast } = useToast();

  useEffect(() => {
    if (!dbUser && !isMutating) {
      navigate("/login");
    }

    if (dbUser) {
      setFormData({
        firstName: dbUser.name.split(" ")[0],
        lastName: dbUser.name.split(" ")[1] || "",
        email: dbUser.email || "",
        phone: dbUser.mobileNo,
      });
    }
  }, [dbUser, isMutating, navigate]);

  const { mutate, status } = useMutation({
    mutationFn: profileUpdate,
    mutationKey: ["profile"],
    onSuccess() {
      refetch();
      setShowModal(false);
      toast({
        description: "Profile updated successfully",
      });
    },

    onError(error) {
      setShowModal(false);
      toast({
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePopupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPopupData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormData((prev) => ({
      ...prev,
      ...popupData,
    }));
    mutate({
      name: `${popupData.firstName} ${popupData.lastName}`,
      uid: dbUser!.uid,
      email: popupData.email,
    });
  };

  if (isMutating) {
    return <PerfumeLoader isLoading />;
  }

  return (
    <div className="flex items-center justify-center h-[90vh] bg-white">
      <div className="w-full bg-white rounded-xl overflow-hidden">
        {/* Header with avatar */}
        <div className="w-full flex justify-center items-center flex-col mx-auto bg-white p-6 rounded-lg">
          <div className="p-6 flex items-center justify-between relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-12">
              <div className="w-30 h-30 bg-black rounded-full flex items-center justify-center text-white text-3xl font-bold border-4 border-white cursor-pointer">
                {formData.firstName
                  ? formData.firstName.charAt(0).toUpperCase()
                  : "?"}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="px-4 md:px-6 max-w-xl w-full pt-16  shadow-[4px_4px_10px_rgba(0,0,0,0.2),-4px_4px_10px_rgba(0,0,0,0.2)] rounded-xl border-solid border-black pb-6">
            <h1 className="text-2xl font-semibold text-center mb-6">Profile</h1>

            <form className="space-y-4">
              <div>
                <label className="text-xs font-bold text-black" htmlFor="name">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={`${formData.firstName} ${formData.lastName}`}
                  onChange={handlePopupChange}
                  className="w-full p-2 border border-gray-3 bg-gray-1 rounded text-sm"
                  disabled
                />
              </div>

              <div>
                <label className="text-xs font-bold text-black" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handlePopupChange}
                  className="w-full p-2 border border-gray-3 bg-gray-1 rounded text-sm"
                  disabled
                />
              </div>

              <div>
                <label className="text-xs font-bold text-black" htmlFor="phone">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-1 border border-gray-3 rounded text-sm"
                  disabled
                />
              </div>

              {/* Edit Profile Button */}
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 p-3 bg-black text-white rounded-md font-medium mt-6 hover: cursor-pointer"
                onClick={() => {
                  // setPopupData({
                  //   firstName: formData.firstName,
                  //   lastName: formData.lastName,
                  //   email: formData.email,
                  //   phone: formData.phone,
                  // });
                  // setShowModal(true);
                  toast({
                    description:
                      "It is in demo mode. Few feature is blocked in demo mode",
                  });
                }}
              >
                <Edit size={20} />
                Edit Profile
              </button>
            </form>
          </div>
        </div>

        {/* Modal Popup */}
        {showModal && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md border border-gray-3 relative">
              {/* Close Button */}
              <button
                title="close"
                className="absolute top-2 right-2 text-black font-bold hover:text-gray-8 hover: cursor-pointer"
                onClick={() => setShowModal(false)}
              >
                <X size={20} />
              </button>

              <h2 className="text-lg font-semibold mb-4">Edit Details</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    className="text-xs text-black font-bold"
                    htmlFor="firstName"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={popupData.firstName}
                    onChange={handlePopupChange}
                    className="w-full p-2 border border-gray-3 rounded text-sm"
                    required
                  />
                </div>
                <div>
                  <label
                    className="text-xs text-black font-bold"
                    htmlFor="lastName"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={popupData.lastName}
                    onChange={handlePopupChange}
                    className="w-full p-2 border border-gray-3 rounded text-sm"
                    required
                  />
                </div>
                <div>
                  <label
                    className="text-xs text-black font-bold"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={popupData.email} // Email ko bhi dikhana hai
                    onChange={handlePopupChange}
                    className="w-full p-2 border border-gray-3 rounded text-sm"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white p-2 rounded-md font-medium hover:bg-gray-900 cursor-pointer flex justify-center items-center gap-2 disabled:bg-zinc-700 disabled:cursor-wait"
                  disabled={status === "pending"}
                >
                  Submit{" "}
                  {status === "pending" && <Loader2 className="animate-spin" />}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileEditPage;
