import OrderTrackingPopup from "@/components/order/OrderTrackingPopup";
import { Download } from "lucide-react";
import { IoIosCheckmark } from "react-icons/io";

const OrderDetails: React.FC = () => {
  return (
    <div className="bg-gray-1 p-4 flex justify-center">
      <div className="container flex flex-col p-1 gap-4 md:flex-row justify-around w-full max-w-6xl">
        <div className="w-full h-max md:w-2/3 bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-items-center justify-between border-b border-gray-3 pb-2">
            <div>
              <h2 className="text-lg font-medium mb-2">
                Ashini Back Cover for Mi Redmi Note 8
              </h2>
              <p className="text-gray-600">Multicolor</p>
              <p className="text-sm text-gray-5">Seller: ashini1</p>
              <p className="text-xl font-bold mt-2">₹154</p>
            </div>
            <div className="flex w-32  px-2">
              <img
                className="object-contain"
                src="https://rukminim1.flixcart.com/image/100/80/xif0q/cases-covers/i/a/a/-original-imagtks8gh89pakw.jpeg?q=100"
                alt="image"
              />
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center gap-2 text-black mb-3">
              <IoIosCheckmark
                size={20}
                className=" p-0 rounded-full bg-green-6 text-white"
              />{" "}
              Order Confirmed, Jan 11, 2022
            </div>
            <button>
              {/* <StepHandler/> */}
              <OrderTrackingPopup />
            </button>
          </div>

          <div className="mt-6 flex justify-between items-center">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-gray-3 text-2xl">
                  ★
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/3 mt-6 md:mt-0">
          <div className="bg-white w-full p-4 rounded-lg shadow-md">
            <button className="w-full group flex items-center justify-center text-base rounded-xl bg-black px-4 py-2.5 font-semibold text-white transition-all duration-200 hover:bg-gray-8 hover:shadow-sm hover:shadow-gray-6/30 gap-3 cursor-pointer">
              <Download className="w-5 h-5" /> Invoice download
            </button>
            <h3 className="font-semibold border-b border-b-gray-3 pt-2 pb-1 text-lg">
              Shipping details
            </h3>
            <p className="text-gray-7 mt-1">Himanshu Kushwaha</p>
            <p className="text-gray-6 text-sm">10, Bas Stand, Uchehara</p>
            <p className="text-gray-6 text-sm">
              Unchahara, Madhya Pradesh - 485661
            </p>
            <p className="text-gray-6 text-sm">Phone: 9399886984, 9753317626</p>
          </div>

          <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-semibold border-b border-b-gray-3 pb-1 text-lg">
              Price Details
            </h3>
            <div className="flex justify-between text-sm mt-1">
              <span>List price</span>
              <span className="line-through">₹799</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span>Selling price</span>
              <span>₹109</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span>Delivery Charge</span>
              <span>₹45</span>
            </div>
            <div className="flex justify-between font-semibold mt-2 border-b border-b-gray-3 pb-1">
              <span>Total Amount</span>
              <span>₹154</span>
            </div>
            <p className="text-gray-7 text-sm mt-2">
              • Cash On Delivery: ₹154.0
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
