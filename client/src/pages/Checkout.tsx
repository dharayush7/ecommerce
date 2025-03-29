import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { ShieldCheck } from "lucide-react";
import { IoIosCheckmark } from "react-icons/io";
import { Button } from "@/components/ui/button";

const addresses = [
  {
    name: "Prins Singh",
    phone: "9981282308",
    type: "WORK",
    address:
      "Parihaar complex, jhand mod, deora no2, Rampur Baghelan Subdistrict, Satna, Madhya Pradesh",
    pincode: "485115",
  },
  {
    name: "Shubham Singh",
    phone: "9074644022",
    type: "HOME",
    address:
      "H n 4022, Ward no 22, near jyoti gas godown, Behind Satna marriage garden utaily, Satna, Madhya Pradesh",
    pincode: "485001",
  },
  {
    name: "PRINS SINGH",
    phone: "9981282308",
    type: "HOME",
    address:
      "Infront of shivaji public school, Second row, Satna, Madhya Pradesh",
    pincode: "485001",
  },
];

export default function Checkout() {
  const [selectedAddress, setSelectedAddress] = useState(addresses[0]);
  const [isDeliverySelected, setDeliverySectected] = useState(false);
  return (
    <div className="flex justify-center p-4 mb-5">
      <div className="container mx-auto grid lg:grid-cols-3 gap-6 w-full">
        {/* Left Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Login Section */}
          <div className=" p-4 rounded-lg bg-white shadow flex justify-between">
            <div>
              <p className="font-semibold mt-1 text-lg">Prins Singh</p>
              <p className="text-gray-500">+91 9981282308</p>
            </div>
          </div>

          {/* Delivery Address Section */}
          {isDeliverySelected ? (
            <div className="p-4 rounded-lg bg-white shadow flex justify-between">
              <h2 className="text-xl font-semibold flex items-center ">
                Delivery Address
              </h2>
              <IoIosCheckmark size={50} />
            </div>
          ) : (
            <div className=" p-4 rounded-lg bg-white shadow">
              <h2 className="text-xl font-semibold flex items-center ">
                Delivery Address
              </h2>
              <RadioGroup
                value={selectedAddress}
                onChange={setSelectedAddress}
                className="space-y-4 mt-2"
              >
                {addresses.map((address, index) => (
                  <RadioGroup.Option
                    key={index}
                    value={address}
                    className={({ checked }) =>
                      `flex items-start space-x-4  p-3 rounded-lg cursor-pointer ${
                        checked ? "-blue-500 bg-gray-1" : "-gray-3"
                      }`
                    }
                  >
                    <input
                      title="selected"
                      type="radio"
                      checked={selectedAddress === address}
                      className="mt-1 accent-gray-6"
                      readOnly
                    />
                    <div>
                      <p className="font-bold">
                        {address.name}
                        {/* <span className="text-xs bg-gray-3 px-2 py-1 rounded ml-2">{address.type}</span> */}
                      </p>
                      <p className="text-sm text-gray-6">{address.phone}</p>
                      <p className="text-sm text-gray-5">
                        {address.address} -{" "}
                        <span className="font-semibold">{address.pincode}</span>
                      </p>
                    </div>
                  </RadioGroup.Option>
                ))}
              </RadioGroup>
              <div className="flex justify-end mr-4">
                <Button className="" onClick={() => setDeliverySectected(true)}>
                  Deliver Here
                </Button>
              </div>
            </div>
          )}
          {/* Add Address */}
          {/* Order Summary */}
          {isDeliverySelected ? (
            <div className="p-4 rounded-lg bg-white shadow">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                Order Summary
              </h2>
              <div>
                <ul role="list" className="divide-y divide-gray-2 mt-2">
                  {[1, 2, 3].map((e) => (
                    <li className="py-3 sm:py-4" key={e}>
                      <div className="flex items-center justify-center space-x-4">
                        <div className="w-full flex space-x-3">
                          <img
                            className="w-12 h-12 "
                            src="https://www.houseofem5.com/cdn/shop/files/1_dde363ea-8e23-49db-84b5-4b87b3f68ff7_800x.jpg?v=1736139252"
                            alt="Neil image"
                          />
                          <div>
                            <p className="text-sm font-medium text-black truncate ">
                              Purfume Lexume
                            </p>
                            <p className="text-sm text-gray-5 truncate ">
                              Size: 4, Brown
                            </p>
                            <p className="text-sm md:hidden text-gray-5 truncate ">
                              Qyt: 3
                            </p>
                          </div>
                        </div>
                        <div className="w-full hidden md:block">
                          <p className="text-sm text-gray-5 truncate ">
                            Qyt: 3
                          </p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-black ">
                          &#8377;7555
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-3">
                <button className="mt-6 w-full py-2 text-lg rounded-lg transition bg-black hover:bg-gray-8 ease-in duration-200 text-white cursor-pointer flex justify-center items-center gap-2">
                  Pay <ShieldCheck size={20} />
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-lg bg-white shadow">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                Order Summary
              </h2>
            </div>
          )}
        </div>

        {/* Price Details Section */}
        <div className=" rounded-lg bg-white shadow p-6 h-max">
          <h2 className="text-lg font-semibold">Price Details</h2>
          <div className="space-y-2 mt-2">
            <p className="flex justify-between">
              <span>Price (1 item)</span> <span>&#8377;316</span>
            </p>
            <p className="flex justify-between">
              <span>Delivery Charges</span>{" "}
              <span className="text-green-700">FREE</span>
            </p>
            <p className="flex justify-between">
              <span>Platform Fee</span> <span>&#8377;3</span>
            </p>
            <hr />
            <p className="flex justify-between font-bold">
              <span>Total Payable</span> <span>&#8377;319</span>
            </p>
            <p className="text-green-700 text-sm font-semibold mt-2">
              Your Total Savings on this order &#8377;380
            </p>
          </div>
          {/* Security Info */}
          <div className="flex items-center text-gray-600 text-sm mt-5">
            <ShieldCheck className="text-gray-500" size={20} />
            <span className="ml-2">
              Safe and Secure Payments. Easy returns. 100% Authentic products.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
