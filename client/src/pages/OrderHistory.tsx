import { Link } from "react-router";

export default function OrderHistory() {
  return (
    <main className="w-full bg-gray-1 flex p-4 justify-center items-center flex-col space-y-2 md:space-y-4 ">
      <div>
        <p className="font-semibold md:text-lg lg:text-3xl">Order History</p>
      </div>
      {[1, 2, 3, 5].map((e) => (
        <Link
          key={e}
          className="container bg-white w-full rounded-md shadow flex justify-between items-center p-2 md:px-4 hover:shadow-md ease-in duration-150"
          to="#"
        >
          <div className="w-full flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-2 lg:space-x-6">
            <img
              src="https://www.houseofem5.com/cdn/shop/files/1_dde363ea-8e23-49db-84b5-4b87b3f68ff7_800x.jpg?v=1736139252"
              alt=""
              className="w-10 h-10 md:w-15 md:h-15 lg:w-25 lg:h-25 object-contain"
            />
            <p className="truncate max-w-2/3 text-xs md:text-sm lg:text-base">
              AJANTA Casual Waterproof Loafers
            </p>
            <p className="text-xs md:hidden">&#8377;699</p>
          </div>
          <div className="hidden md:block text-sm lg:text-base">
            <p>&#8377;699</p>
          </div>
          <div className="w-full text-xs flex flex-col items-end justify-center lg:text-base">
            <p className=" text-green-6 font-medium">Delivered on Mar 07</p>
            <p>Your item has been delivered</p>
          </div>
        </Link>
      ))}
    </main>
  );
}
