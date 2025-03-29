import { XIcon } from "lucide-react";
import React, { useState } from "react";
import { TbLocationFilled } from "react-icons/tb";
import { IoIosCheckmark } from "react-icons/io";
const OrderTrackingPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const steps = [
    { label: "Order Placed", date: "Jan 10, 2022", completed: true },
    { label: "Order Confirmed", date: "Jan 11, 2022", completed: true },
    { label: "Shipped", date: "Jan 14, 2022", completed: true },
    { label: "Out for Delivery", date: "Jan 16, 2022", completed: false },
    { label: "Delivered", date: "Jan 17, 2022", completed: false },
  ];

  return (
    <div className="flex justify-center items-center  bg-gray-1">
      <button
        onClick={() => setIsOpen(true)}
        className="bg-slate-900 ease-in duration-300 flex justify-center justify-items-center items-center gap-2 text-white px-4 py-2 rounded-lg font-semibold hover:bg-slate-7 transition"
      >
        Track Order
        <TbLocationFilled size={16} className="mt-1" color="white" />
      </button>

      {/* Modal Popup */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/35">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
            <h2 className="text-lg font-semibold mb-4">Order Tracking </h2>

            {/* Close Button */}
            <XIcon
              size={25}
              onClick={() => setIsOpen(false)}
              className="absolute cursor-pointer top-3 right-3 text-gray-7 "
            />

            {/* Order Steps */}
            <div className="relative">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="relative flex items-center mb-6 last:mb-0"
                >
                  {/* Line Connector */}
                  {index !== steps.length - 1 && (
                    <div
                      className={`absolute left-2.5 top-9 h-full w-1 ${
                        step.completed ? "bg-green-6" : "bg-gray-3"
                      }`}
                    />
                  )}

                  {/* Step Indicator */}
                  <div
                    className={`w-6 h-6 flex items-center justify-center rounded-full border-2 ${
                      step.completed
                        ? "bg-green-6 text-white"
                        : "bg-gray-2  text-gray-5"
                    }`}
                  >
                    {step.completed ? (
                      <IoIosCheckmark className="text-white" />
                    ) : (
                      index + 1
                    )}
                  </div>

                  {/* Step Information */}
                  <div className="ml-6">
                    <p
                      className={`font-medium ${
                        step.completed ? "text-green-6" : "text-gray-5"
                      }`}
                    >
                      {step.label}
                    </p>
                    <p className="text-sm text-gray-4">{step.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTrackingPopup;
