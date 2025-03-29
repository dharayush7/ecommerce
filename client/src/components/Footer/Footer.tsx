import logos from "@/assets/logos";
const Footer = () => {
  return (
    <>
      <footer className="pt-9 pb-5 bg-[#09090b]/95 text-white px-12">
        <div className="w-full grid gap-6 md:grid-cols-2 lg:grid-cols-4 items-start">
          {/* Quick Menu */}
          <div className="w-full flex flex-col justify-center items-start">
            <p className="uppercase text-xl tracking-[2px] pb-3 font-mono">
              Quick Menu
            </p>
            <ul className="ml-4 space-y-1">
              <li className="hover:translate-x-2 ease-out duration-150 hover:text-gray-2">
                <a className="" href="pages/home.html">
                  Home
                </a>
              </li>
              <li className="hover:translate-x-2 ease-out duration-150 hover:text-gray-2">
                <a href="pages/about.html">About Us</a>
              </li>
              <li className="hover:translate-x-2 ease-out duration-150 hover:text-gray-2">
                <a href="blogs/perfume-fashion.html">Our Blogs</a>
              </li>
              <li className="hover:translate-x-2 ease-out duration-150 hover:text-gray-2">
                <a href="index.html#smile-home">Rewards Program</a>
              </li>
              <li className="hover:translate-x-2 ease-out duration-150 hover:text-gray-2">
                <a href="https://perfume24x7.shiprocket.co/tracking/">
                  Track Your Order
                </a>
              </li>
              <li className="hover:translate-x-2 ease-out duration-150 hover:text-gray-2">
                <a href="pages/order-cancellation.html">Order Cancellations</a>
              </li>
              <li className="hover:translate-x-2 ease-out duration-150 hover:text-gray-2">
                <a href="privacy-policy">Privacy Policy</a>
              </li>
              <li className="hover:translate-x-2 ease-out duration-150 hover:text-gray-2">
                <a href="shipping-policy">Shipping Policy</a>
              </li>
              <li className="hover:translate-x-2 ease-out duration-150 hover:text-gray-2">
                <a href="return-policy">Return Policy</a>
              </li>
              <li className="hover:translate-x-2 ease-out duration-150 hover:text-gray-2">
                <a href="terms-and-conditions">Terms & Conditions</a>
              </li>
              <li className="hover:translate-x-2 ease-out duration-150 hover:text-gray-2">
                <a href="policies/contact-information.html">Contact us</a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="w-full flex flex-col justify-center items-start ">
            <p className="uppercase text-xl tracking-[2px] pb-3 font-mono">
              Categories
            </p>
            <ul className="ml-4 space-y-1">
              <li className="hover:translate-x-2 ease-out duration-150 hover:text-gray-2">
                <a href="collections/perfumes.html">Perfumes</a>
              </li>
              <li className="hover:translate-x-2 ease-out duration-150 hover:text-gray-2">
                <a href="collections/gift-sets.html">Gift Sets</a>
              </li>
              <li className="hover:translate-x-2 ease-out duration-150 hover:text-gray-2">
                <a href="collections/fragrance-mists.html">Fragrance Mists</a>
              </li>
              <li className="hover:translate-x-2 ease-out duration-150 hover:text-gray-2">
                <a href="collections/miniatures.html">Miniatures</a>
              </li>
              <li className="hover:translate-x-2 ease-out duration-150 hover:text-gray-2">
                <a href="collections/deodorant.html">Deodorants</a>
              </li>
              <li className="hover:translate-x-2 ease-out duration-150 hover:text-gray-2">
                <a href="collections/deodorant-stick.html">Deodorant Stick</a>
              </li>
              <li className="hover:translate-x-2 ease-out duration-150 hover:text-gray-2">
                <a href="collections/after-shaves.html">After Shaves</a>
              </li>
              <li className="hover:translate-x-2 ease-out duration-150 hover:text-gray-2">
                <a href="collections/shower-gel.html">Shower Gel</a>
              </li>
              <li className="hover:translate-x-2 ease-out duration-150 hover:text-gray-2">
                <a href="collections/body-lotion.html">Body Lotion</a>
              </li>
            </ul>
          </div>

          {/* Top Brands */}
          <div className="w-full flex flex-col justify-center items-start">
            <p className="uppercase text-xl tracking-[2px] pb-3 font-mono">
              Top Brands
            </p>
            <ul className="ml-4 space-y-1">
              <li className="hover:translate-x-2 ease-out duration-150 hover:text-gray-2">
                <a href="collections/azzaro-perfumes.html">Azzaro</a>
              </li>
              <li className="hover:translate-x-2 ease-out duration-150 hover:text-gray-2">
                <a href="collections/burberry-perfumes.html">Burberry</a>
              </li>
              <li className="hover:translate-x-2 ease-out duration-150 hover:text-gray-2">
                <a href="collections/bvlgari-perfumes.html">Bvlgari</a>
              </li>
              <li className="hover:translate-x-2 ease-out duration-150 hover:text-gray-2">
                <a href="collections/calvin-klein-perfumes.html">
                  Calvin Klein
                </a>
              </li>
              <li className="hover:translate-x-2 ease-out duration-150 hover:text-gray-2">
                <a href="collections/davidoff-perfumes.html">Davidoff</a>
              </li>
              <li className="hover:translate-x-2 ease-out duration-150 hover:text-gray-2">
                <a href="collections/hugo-boss-perfumes.html">Hugo Boss</a>
              </li>
              <li className="hover:translate-x-2 ease-out duration-150 hover:text-gray-2">
                <a href="collections/paco-rabanne.html">Paco Rabanne</a>
              </li>
              <li className="hover:translate-x-2 ease-out duration-150 hover:text-gray-2">
                <a href="collections/versace-perfumes.html">Versace</a>
              </li>
              <li className="hover:translate-x-2 ease-out duration-150 hover:text-gray-2">
                <a href="collections/victorias-secret.html">
                  Victoria's Secret
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="w-full flex flex-col justify-start items-center">
            <p className="uppercase text-xl tracking-[2px] pb-3 font-mono">
              Sign up and save
            </p>
            <p className="text-justify font-lg">
              Subscribe to get special offers, free giveaways, and
              once-in-a-lifetime deals.
            </p>
            <form
              method="post"
              action="https://www.perfume24x7.com/contact#newsletter-footer"
              id="newsletter-footer"
              acceptCharset="UTF-8"
              className="flex flex-col w-full px-4"
            >
              <input
                type="email"
                placeholder="Enter your email"
                name="contact[email]"
                required
                className=" mb-4 mt-7 outline-none focus:border focus:border-gray-5 px-5 !bg-gray-2 !border-0 outline-gray-2 placeholder:font-medium placeholder:text-gray-5 !rounded-md !text-black py-2 "
              />
              <button
                type="submit"
                className="bg-white/5 shadow-md cursor-pointer !border-[1.5px] border-white rounded-md px-4 py-1.5 hover:!bg-white hover:!text-black font-medium ease-out duration-300"
              >
                Subscribe
              </button>
            </form>
            <a
              href="https://tfptechnologies.in/"
              target="_blank"
              rel="noopener"
              className="hover:translate-x-2 ease-in duration-200 pt-8"
            >
              <div className="flex w-full flex-col justify-center items-center">
                <img src={logos.tfp} alt="tfp" className="w-14 h-14" />
                <p className="text-xs">
                  Devoloped and designed by TFP Technologies
                </p>
              </div>
            </a>
          </div>
        </div>
      </footer>

      <div className="bg-black py-1.5 flex justify-center items-center text-xs md:text-sm lg:text-base">
        <p className="text-center text-white py-1">
          &copy; 2025 Perfume24x7.com. All transactions on Perfume24x7.com are
          secured by SSL and protected via multiple payment gateways.
        </p>
      </div>
    </>
  );
};

export default Footer;
