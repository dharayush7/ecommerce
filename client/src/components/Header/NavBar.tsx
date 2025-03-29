import { Link } from "react-router";
import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  User,
  Search,
  ShoppingCart,
  Menu,
  LogOut,
} from "lucide-react";
import logos from "@/assets/logos";
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
import { useAuth } from "@/hook/AuthProvider";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useCart } from "@/hook/CartProvider";

interface User {
  name: string;
  number: string;
  products: string[];
}

const NavBar: React.FC = () => {
  const { dbUser, isMutating } = useAuth();
  const { items } = useCart();
  const login = true;
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openNestedDropdown, setOpenNestedDropdown] = useState<string | null>(
    null
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
    setOpenNestedDropdown(null);
  };

  const toggleNestedDropdown = (submenu: string) => {
    setOpenNestedDropdown(openNestedDropdown === submenu ? null : submenu);
  };

  if (isMutating) {
    return <></>;
  }

  return (
    <nav className="bg-[#f9fafb] shadow-sm sticky top-0 z-50 w-full">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 NavBrand">
            <Link to="/">
              <img
                src={logos.logo}
                alt="logo"
                className="cursor-pointer w-12 h-12"
              />
            </Link>
          </div>

          <div className="hidden md:flex space-x-2">
            <div className="relative group">
              <Link to="/">
                <button className="px-3 py-2 text-gray-700 font-semibold cursor-pointer">
                  Home
                </button>
              </Link>
            </div>
            <div className="relative group">
              {/* Dropdown Button */}
              <button className="px-3 py-2 text-gray-700 font-semibold flex items-center gap-1 cursor-pointer">
                Shop
                {openDropdown === "Shop" ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </button>

              {/* Dropdown Menu (Centered) */}
              <div className="absolute left-1/4 transform -translate-x-1/4 hidden group-hover:grid grid-cols-4 gap-1 bg-white shadow-md  rounded-md p-4 w-max">
                {/* For Men */}
                <div className="w-auto p-4 ">
                  <h1 className="text-lg font-semibold mb-2">For Men</h1>
                  <div className="flex flex-col space-y-2">
                    <a
                      href="/"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-1"
                    >
                      Shirts
                    </a>
                    <a
                      href="/docs"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-1"
                    >
                      Pants
                    </a>
                    <a
                      href="/"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-1"
                    >
                      Shirts
                    </a>
                    <a
                      href="/docs"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-1"
                    >
                      Pants
                    </a>
                  </div>
                </div>

                {/* For Women */}
                <div className="w-auto p-4 ">
                  <h1 className="text-lg font-semibold mb-2">For Women</h1>
                  <div className="flex flex-col space-y-2">
                    <a
                      href="/"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-1"
                    >
                      Shirts
                    </a>
                    <a
                      href="/docs"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-1"
                    >
                      Pants
                    </a>
                    <a
                      href="/"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-1"
                    >
                      Shirts
                    </a>
                    <a
                      href="/docs"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-1"
                    >
                      Pants
                    </a>
                  </div>
                </div>

                {/* For Gifts */}
                <div className="w-auto p-4 ">
                  <h1 className="text-lg font-semibold mb-2">For Gifts</h1>
                  <div className="flex flex-col space-y-2">
                    <a
                      href="/"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-1"
                    >
                      Shirts
                    </a>
                    <a
                      href="/docs"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-1"
                    >
                      Pants
                    </a>
                    <a
                      href="/docs/installation"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-1"
                    >
                      Shoes
                    </a>
                    <a
                      href="/docs/primitives/typography"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-1"
                    >
                      Typography
                    </a>
                  </div>
                </div>

                {/* Image */}
                <div className="w-auto p-4">
                  <div className="w-48 h-60 overflow-hidden rounded-lg">
                    <img
                      src="https://www.shutterstock.com/image-photo/man-hand-perfume-on-gray-260nw-1236731434.jpg"
                      alt="img"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <button className="px-3 py-2 text-gray-700 font-semibold d-flex items-center gap-1 cursor-pointer">
                Personalize
              </button>
            </div>
            <div className="relative group">
              <button className="px-3 py-2 text-gray-700 flex font-semibold items-center d-flex gap-1 cursor-pointer">
                About
                {openDropdown === "About" ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </button>
              <div className="absolute hidden group-hover:block bg-white shadow-md  rounded-md w-48">
                <Link
                  to="/about-us"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-1"
                >
                  About Us
                </Link>
                <a
                  href="/docs/primitives/hover-card"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-1"
                >
                  Meet team
                </a>
                <Link
                  to="/contact"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-1"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:flex space-x-4 items-center">
            <div className="relative w-64">
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 bg-gray-1 rounded-md border-1 border-gray-4 outline-none focus:border-gray-700"
                placeholder="Search..."
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-5"
                size={18}
              />
            </div>
            {dbUser ? (
              <div className="flex space-x-4">
                <Link to="/cart" className="p-2 rounded-full">
                  <ShoppingCart size={20} />
                  <div className="absolute top-2 right-24 size-5 bg-black text-white text-xs rounded-full flex items-center justify-center">
                    {items.length}
                  </div>
                </Link>
                <div className="relative inline-block text-left">
                  <button
                    title="profile"
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg transition cursor-pointer"
                  >
                    <User size={20} />
                  </button>
                  {isOpen && (
                    <div className="absolute right-0 mt-2 w-auto bg-white shadow-lg rounded-lg p-2 pt-3 z-10 min-w-52">
                      <div className="flex justify-start items-center space-x-2 mb-3 pl-3">
                        <img
                          src={`https://avatar.oxro.io/avatar.svg?name=${dbUser.name}&length=1`}
                          alt="profile"
                          className="w-1/5 rounded-full "
                        />
                        <p className="font-medium text-lg">{dbUser.name}</p>
                      </div>
                      <hr className="text-gray-3" />
                      <div className="flex flex-col mt-3 mb-2">
                        <Link
                          to="/profile"
                          onClick={() => setIsOpen(false)}
                          className="hover:bg-gray-1 py-1 px-3  rounded-md"
                        >
                          View Profile
                        </Link>
                        <Link
                          to="/address"
                          onClick={() => setIsOpen(false)}
                          className="hover:bg-gray-1 py-1 px-3  rounded-md"
                        >
                          Save Addresses
                        </Link>
                        <Link
                          onClick={() => setIsOpen(false)}
                          className="hover:bg-gray-1 py-1 px-3  rounded-md"
                          to="order-history"
                        >
                          Order History
                        </Link>
                        <Link
                          className="hover:bg-gray-1 py-1 px-3  rounded-md"
                          to="#"
                        >
                          Wishlist
                        </Link>
                      </div>
                      <hr className="text-gray-3" />

                      <AlertDialog>
                        <AlertDialogTrigger className="flex w-full mt-2 px-3 justify-between hover:bg-gray-1 py-1 rounded-md items-center cursor-pointer border-none">
                          Logout
                          <LogOut size={20} />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              It looks like you're ready to take a break! We'll
                              miss you, but don't forget to save your products
                              before you go. See you next time!
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="cursor-pointer border-black">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-red-700 hover:bg-red-6 cursor-pointer"
                              onClick={() => {
                                signOut(auth);
                                localStorage.removeItem("cart");
                              }}
                            >
                              Logout
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <button className="p-3 rounded-full">
                <Link
                  role="button"
                  className="group relative inline-flex items-center justify-center text-base rounded-xl bg-black px-4 py-2.5 font-semibold text-white transition-all duration-200 hover:bg-gray-8 hover:shadow-sm hover:shadow-grey-6/30"
                  title="login"
                  to="/login"
                >
                  Login
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 10 10"
                    height="10"
                    width="10"
                    fill="none"
                    className="mt-0.5 ml-2 -mr-1 stroke-white stroke-2"
                  >
                    <path
                      d="M0 5h7"
                      className="transition opacity-0 group-hover:opacity-100"
                    ></path>
                    <path
                      d="M1 1l4 4-4 4"
                      className="transition group-hover:translate-x-[3px]"
                    ></path>
                  </svg>
                </Link>
              </button>
            )}
          </div>
          <button
            title="menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden px-3 py-2 fs-1 rounded-md font-extrabold"
          >
            <Menu />
          </button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden px-4 py-5 space-y-2">
          {/* Home */}
          <Link
            to="/"
            className="flex justify-between w-full text-left px-4 py-2 text-gray-700 font-semibold"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>

          {/* Shop Dropdown */}
          <div>
            <button
              className="flex justify-between w-full text-left px-4 py-2 text-gray-700 font-semibold"
              onClick={() => toggleDropdown("Shop")}
            >
              Shop
              {openDropdown === "Shop" ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </button>
            {openDropdown === "Shop" && (
              <div className="pl-4 space-y-2">
                <button
                  className="w-full flex gap-2 items-center px-4 py-2 text-grey-6"
                  onClick={() => toggleNestedDropdown("Men")}
                >
                  Men{" "}
                  {openNestedDropdown === "Men" ? (
                    <ChevronUp size={12} />
                  ) : (
                    <ChevronDown size={12} />
                  )}
                </button>
                {openNestedDropdown === "Men" && (
                  <div className="pl-4 space-y-1">
                    <Link to="/" className="block text-grey-6 py-1">
                      Shirts
                    </Link>
                    <Link to="/" className="block text-grey-6 py-1">
                      Pants
                    </Link>
                  </div>
                )}

                <button
                  className="w-full flex gap-2 items-center px-4 py-2 text-grey-6"
                  onClick={() => toggleNestedDropdown("Women")}
                >
                  Women{" "}
                  {openNestedDropdown === "Women" ? (
                    <ChevronUp size={12} />
                  ) : (
                    <ChevronDown size={12} />
                  )}
                </button>
                {openNestedDropdown === "Women" && (
                  <div className="pl-4 space-y-1">
                    <Link to="/" className="block text-grey-6 py-1">
                      Dresses
                    </Link>
                    <Link to="/" className="block text-grey-6 py-1">
                      Accessories
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Personality Dropdown */}
          <div>
            <button
              className="flex justify-between w-full text-left px-4 py-2 text-gray-700 font-semibold"
              onClick={() => toggleDropdown("Personality")}
            >
              Personalize
            </button>
          </div>

          {/* About Dropdown */}
          <div>
            <button
              className="flex justify-between w-full text-left px-4 py-2 text-gray-700 font-semibold"
              onClick={() => toggleDropdown("About")}
            >
              About
              {openDropdown === "About" ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </button>
            {openDropdown === "About" && (
              <div className="pl-4 space-y-2">
                <Link to="/about-us" className="block text-grey-6 py-1">
                  About Us
                </Link>
                <Link to="/contact" className="block text-grey-6 py-1">
                  Contact Us
                </Link>
              </div>
            )}
          </div>
          <div>
            {login ? (
              <div className="flex space-x-4">
                <button title="cart" className="p-2 rounded-full">
                  <ShoppingCart size={20} />
                </button>
                <div className="relative inline-block text-left">
                  <button
                    title="profile"
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg transition cursor-pointer"
                  >
                    <User size={20} />
                  </button>
                  {isOpen && (
                    <div className="absolute mt-2 w-auto bg-white shadow-lg rounded-lg p-2 pt-3 z-10 min-w-52">
                      <div className="flex justify-start items-center space-x-2 mb-3 pl-3">
                        <img
                          src={`https://avatar.oxro.io/avatar.svg?name=Jhon&length=1`}
                          alt="profile"
                          className="w-1/5 rounded-full "
                        />
                        <p className="font-medium text-lg">John Doe</p>
                      </div>
                      <hr />
                      <div className="flex flex-col mt-3 mb-2">
                        <Link
                          to="/profile"
                          onClick={() => setIsOpen(false)}
                          className="hover:bg-gray-1 py-1 px-3  rounded-md"
                        >
                          View Profile
                        </Link>
                        <Link
                          to="/address"
                          onClick={() => setIsOpen(false)}
                          className="hover:bg-gray-1 py-1 px-3  rounded-md"
                        >
                          Save Addresses
                        </Link>
                        <Link
                          className="hover:bg-gray-1 py-1 px-3  rounded-md"
                          to="#"
                        >
                          Order History
                        </Link>
                        <Link
                          className="hover:bg-gray-1 py-1 px-3  rounded-md"
                          to="#"
                        >
                          Wishlist
                        </Link>
                      </div>
                      <hr />

                      <AlertDialog>
                        <AlertDialogTrigger className="flex w-full mt-2 px-3 justify-between hover:bg-gray-1 py-1 rounded-md items-center cursor-pointer border-none">
                          Logout
                          <LogOut size={20} />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              It looks like you're ready to take a break! We'll
                              miss you, but don't forget to save your products
                              before you go. See you next time!
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="cursor-pointer border-black">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction className="bg-red-700 hover:bg-red-6 cursor-pointer">
                              Logout
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <button className="p-3 rounded-full">
                <Link
                  role="button"
                  className="group relative inline-flex items-center justify-center text-base rounded-xl bg-black px-4 py-2.5 font-semibold text-white transition-all duration-200 hover:bg-gray-8 hover:shadow-sm hover:shadow-grey-6/30"
                  title="login"
                  to="/login"
                >
                  Login
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 10 10"
                    height="10"
                    width="10"
                    fill="none"
                    className="mt-0.5 ml-2 -mr-1 stroke-white stroke-2"
                  >
                    <path
                      d="M0 5h7"
                      className="transition opacity-0 group-hover:opacity-100"
                    ></path>
                    <path
                      d="M1 1l4 4-4 4"
                      className="transition group-hover:translate-x-[3px]"
                    ></path>
                  </svg>
                </Link>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
