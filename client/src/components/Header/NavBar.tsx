import { Link } from "react-router";
import { useEffect, useState } from "react";
import {
  ChevronDown,
  User,
  Search,
  ShoppingCart,
  Menu,
  LogOut,
  X,
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface User {
  name: string;
  number: string;
  products: string[];
}

const NavBar: React.FC = () => {
  const { dbUser, isMutating } = useAuth();
  const { items } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  if (isMutating) {
    return <></>;
  }

  return (
    <nav className="bg-[#f9fafb] shadow-sm sticky top-0 z-50 w-full">
      <div className="max-w-9xl mx-auto px-2 md:px-4 lg:px-6">
        <div className="flex justify-between h-16 items-center">
          <div className="">
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
                <ChevronDown size={18} />
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
                <ChevronDown size={18} />
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
              <div className="flex space-x-8 justify-end items-center">
                <Link to="/cart" className="p-2 rounded-full">
                  <ShoppingCart size={20} />
                  <div className="absolute top-2 right-18 size-5 bg-black text-white text-xs rounded-full flex items-center justify-center">
                    {items.length}
                  </div>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center space-x-2 rounded-full transition cursor-pointer">
                    <User size={20} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-52 mr-5 mt-4 border-gray-2">
                    <DropdownMenuLabel className="flex justify-start items-center space-x-2 mb-3 pl-3">
                      <img
                        src={`https://avatar.oxro.io/avatar.svg?name=${dbUser.name}&length=1`}
                        alt="profile"
                        className="w-1/5 rounded-full"
                      />
                      <p className="font-medium text-lg">{dbUser.name}</p>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-md">
                      <Link to="profile">View Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-md">
                      <Link to="/address">Save Addresses</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-md">
                      <Link to="order-history"> Order History</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-md">
                      <Link to="#">Wishlist</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="flex item-center justify-between text-md"
                      onClick={() => setIsOpen(true)}
                    >
                      Logout
                      <LogOut size={20} />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <AlertDialog open={isOpen}>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        It looks like you're ready to take a break! We'll miss
                        you, but don't forget to save your products before you
                        go. See you next time!
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
                        className="bg-red-700 hover:bg-red-6 cursor-pointer"
                        onClick={() => {
                          signOut(auth);
                          localStorage.removeItem("cart");
                          setIsOpen(false);
                        }}
                      >
                        Logout
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
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
          <div className="md:hidden ml-2">
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 bg-gray-1 rounded-md border-1 border-gray-4 outline-none focus:border-gray-700"
              placeholder="Search..."
            />
            <Search className="absolute -mt-8 ml-2 text-gray-5" size={18} />
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
      {mobileMenuOpen && <SideBar setOpen={setMobileMenuOpen} />}
    </nav>
  );
};

export default NavBar;

const SideBar = ({ setOpen }: { setOpen: (e: boolean) => void }) => {
  const [state, setState] = useState(false);
  const { dbUser } = useAuth();
  const { items } = useCart();
  useEffect(() => {
    if (state) {
      setTimeout(() => {
        setOpen(false);
      }, 400);
    }
  }, [setOpen, state]);
  return (
    <div
      className={`fixed z-10 w-screen bg-black/20 ease-in duration-200 h-screen top-0 right-0  flex justify-end items-center`}
    >
      <div
        className={` w-[90vw] bg-white h-screen ${
          state ? "animate-fade-out-right" : "animate-fade-in-right"
        } duration-500 z-20`}
      >
        <div className="w-full pt-2 pr-2 flex items-center justify-end">
          <button
            title="close"
            className="p-1 mt-3 hover:text-black ease-in duration-150 text-black"
            onClick={() => {
              setState(true);
            }}
          >
            <X />
          </button>
        </div>

        <div className="w-full px-10 pt-2">
          <Link to="/" onClick={() => setState(true)}>
            <p className="text-xl font-semibold text-black ease-in-out duration-150 mb-4">
              Home
            </p>
          </Link>
          <Accordion type="single" collapsible className="w-full mb-4">
            <AccordionItem value="item-1" className="border-transparent">
              <AccordionTrigger
                className="text-xl font-semibold text-black ease-in-out duration-150 p-0 decoration-0 decoration-transparent"
                iconClassName="size-6 text-black"
              >
                Shop
              </AccordionTrigger>
              <AccordionContent className="ml-4">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1" className="border-transparent">
                    <AccordionTrigger
                      className="text-xl font-semibold text-black ease-in-out duration-150 p-0 pb-2 pt-3 decoration-0 decoration-transparent"
                      iconClassName="size-6 text-black"
                    >
                      Men
                    </AccordionTrigger>
                    <AccordionContent>
                      Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1" className="border-transparent">
                    <AccordionTrigger
                      className="text-xl font-semibold text-black ease-in-out duration-150 p-0 pb-2 decoration-0 decoration-transparent"
                      iconClassName="size-6 text-black"
                    >
                      Women
                    </AccordionTrigger>
                    <AccordionContent>
                      Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1" className="border-transparent">
                    <AccordionTrigger
                      className="text-xl font-semibold text-black ease-in-out duration-150 p-0 pb-2 decoration-0 decoration-transparent"
                      iconClassName="size-6 text-black"
                    >
                      Gift
                    </AccordionTrigger>
                    <AccordionContent>
                      Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Link to="#" onClick={() => setState(true)}>
            <p className="text-xl font-semibold text-black ease-in-out duration-150 mb-4">
              Personalize
            </p>
          </Link>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-transparent">
              <AccordionTrigger
                className="text-xl font-semibold text-black ease-in-out duration-150 p-0 decoration-0 decoration-transparent"
                iconClassName="size-6 text-black"
              >
                About
              </AccordionTrigger>
              <AccordionContent className="ml-4 text-xl font-medium space-y-2 flex flex-col mt-2">
                <Link to="about-us" onClick={() => setState(true)}>
                  <p>About Us</p>
                </Link>
                <Link to="#" onClick={() => setState(true)}>
                  <p>Meet Our Team</p>
                </Link>
                <Link to="#" onClick={() => setState(true)}>
                  <p>Contact Us</p>
                </Link>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="px-5 py-4">
          <hr className="text-gray-300" />
        </div>
        {dbUser ? (
          <div className="w-full px-10 space-y-3 flex flex-col text-xl font-medium">
            <Link to="profile" onClick={() => setState(true)}>
              <p>View Profile</p>
            </Link>
            <Link to="address" onClick={() => setState(true)}>
              <p>Save Addresses</p>
            </Link>
            <Link to="order-history" onClick={() => setState(true)}>
              <p>Order History</p>
            </Link>
            <Link to="cart">
              <p
                className="flex items-center gap-2"
                onClick={() => setState(true)}
              >
                Cart <Badge className="">{items.length}</Badge>
              </p>
            </Link>
            <AlertDialog>
              <AlertDialogTrigger className="flex justify-between items-center w-full h-full cursor-pointer">
                Logout
                <LogOut size={20} />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    It looks like you're ready to take a break! We'll miss you,
                    but don't forget to save your products before you go. See
                    you next time!
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
                      setState(true);
                    }}
                  >
                    Logout
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <button className="rounded-full">
              <Link
                role="button"
                className="group relative inline-flex items-center justify-center text-base rounded-xl bg-black px-4 py-2.5 font-semibold text-white transition-all duration-200 hover:bg-gray-8 hover:shadow-sm hover:shadow-grey-6/30"
                title="login"
                to="/login"
                onClick={() => setState(true)}
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
          </div>
        )}
      </div>
    </div>
  );
};
