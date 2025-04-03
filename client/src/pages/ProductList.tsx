import OffcanvasProduct2 from "@/components/card/offcavass";
import ProductCard from "@/components/card/ProductCard";
import { Button } from "@/components/ui/button";
import { GetProduct } from "@/lib/types";
import { useEffect, useState } from "react";
import { FaChevronDown, FaFilter, FaTimes } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getCategoryProducts } from "@/service/catagory";
import PerfumeLoader from "@/components/Loader/ModernLoader";

interface Filter {
  name: string;
  options: string[];
}

const filters: Filter[] = [
  { name: "Gender", options: ["Men", "Women", "Unisex"] },
  { name: "Brand", options: ["Dolce & Gabbana", "Versace", "Tommy", "Gucci"] },
  { name: "Product Type", options: ["Perfume", "Eau De Parfum", "Cologne"] },
  { name: "Size", options: ["50ml", "100ml", "150ml"] },
  {
    name: "Price",
    options: ["Under Rs.5000", "Rs.5000 - Rs.10,000", "Above Rs.10,000"],
  },
  { name: "Availability", options: ["In Stock", "Out of Stock"] },
];

export default function ProductList() {
  // State Management with Types
  const [selectedFilter, setSelectedFilter] = useState<Record<string, string>>(
    {}
  );
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [product, setProduct] = useState<GetProduct | null>(null);
  const [show, setShow] = useState(false);
  const [isQuickView, setIsQuickView] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!params.id) {
      navigate("/error");
    }
  }, [navigate, params.id]);

  // Handle filter selection
  const handleFilterChange = (filterName: string, value: string) => {
    setSelectedFilter({ ...selectedFilter, [filterName]: value });
  };

  // Toggle filter sections
  const toggleSection = (sectionName: string) => {
    setOpenSections((prev) => ({ ...prev, [sectionName]: !prev[sectionName] }));
  };

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getCategoryProducts({ categoryId: params.id! }),
    queryKey: ["category", params.id!],
  });

  if (isLoading) {
    return <PerfumeLoader isLoading />;
  }

  if (!data || isError || !data.category || !data.data) {
    navigate("/error");
    return <></>;
  }

  return (
    <div className="max-w-9xl mx-auto px-4 sm:px-6 py-8">
      <header className="mb-4 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 ">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-6 text-center">
            <a href="/" className="hover:underline">
              Home
            </a>{" "}
            /
            <a href="/catagory" className="hover:underline mx-2 ">
              categories
            </a>
          </nav>

          {/* Page Title */}
          <h1 className="text-3xl md:text-4xl font-bold  mt-2 text-center">
            {data.category.name}
          </h1>
        </div>
      </header>

      {/* Top Bar: Sorting & Sidebar Toggle for md screens */}
      <div className="w-full flex justify-between items-center mb-4 ">
        <button
          className="lg:hidden flex items-center gap-2 text-gray-700 border p-2 rounded-md"
          onClick={() => setShowSidebar(true)}
        >
          <FaFilter /> Filters
        </button>
        <div className="hidden lg:block" />
        <Select>
          <SelectTrigger className="w-50 bg-white border border-gray-5">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent className="">
            <SelectItem value="light">Best Selling</SelectItem>
            <SelectItem value="dark">Price: Low to High</SelectItem>
            <SelectItem value="system">Price: High to Low</SelectItem>
            <SelectItem value="system">New Arrivals</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col md:flex-row justify-center md:justify-normal gap-8 ">
        {/* Sidebar Filters - Visible on lg screens */}
        <div className="hidden lg:block w-[15vw] space-y-4 sticky top-36 h-fit">
          <div className="flex w-[15vw] space-x-8">
            <div className="w-full">
              {filters.map((filter, id) => (
                <div key={id} className="border-b border-gray-3 pb-2">
                  <button
                    className="flex justify-between items-center w-full text-left font-semibold text-gray-700 py-2"
                    onClick={() => toggleSection(filter.name)}
                  >
                    {filter.name}
                    <FaChevronDown
                      className={`transition-transform duration-300 ${
                        openSections[filter.name] ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`mt-2 space-y-1 transition-all duration-300 ${
                      openSections[filter.name]
                        ? "max-h-40 opacity-100"
                        : "max-h-0 opacity-0 overflow-hidden"
                    }`}
                  >
                    {filter.options.map((option, id) => (
                      <div className="flex" key={id}>
                        <input
                          id={`${id}`}
                          type="checkbox"
                          name={filter.name}
                          value={option}
                          onChange={() =>
                            handleFilterChange(filter.name, option)
                          }
                          className="mr-2 text-slate-600 accent-black"
                        />
                        <div className="flex w-auto">
                          <label
                            key={option}
                            htmlFor={`${id}`}
                            className="block text-gray-6"
                          >
                            {option}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <Button className="w-full mt-9">Apply Fillters</Button>
            </div>
            <div className="w-[1px] h-[70vh] bg-gray-3"></div>
          </div>
        </div>

        {/* Product Grid */}
        <div className=" w-full flex justify-center items-center">
          <div className="flex flex-wrap justify-center md:justify-start space-x-4 space-y-4  w-fit">
            {data.data.map((product) => (
              <ProductCard
                data={{
                  ...product,
                  categories: [],
                  tags: [],
                  images: product.images.map((e) => e.url),
                }}
                setIsQuickView={setIsQuickView}
                setProduct={setProduct}
                setShow={setShow}
                key={product.id}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Drawer */}
      {showSidebar && (
        <div className="fixed inset-0 bg-black/35 bg-opacity-50 z-50 flex justify-end">
          <div className="w-80 bg-white h-full p-4 shadow-lg">
            <button
              title="Show Sidebar"
              className="text-gray-700 text-xl float-right"
              onClick={() => setShowSidebar(false)}
            >
              <FaTimes />
            </button>
            <h2 className="text-lg font-semibold mb-4">Filters</h2>
            {filters.map((filter) => (
              <div key={filter.name} className="border-b pb-2">
                <button
                  className="flex justify-between items-center w-full text-left font-semibold text-gray-700 py-2"
                  onClick={() => toggleSection(filter.name)}
                >
                  {filter.name}{" "}
                  <FaChevronDown
                    className={`transition-transform duration-300 ${
                      openSections[filter.name] ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>
            ))}
            <Button className="w-full mt-9">Apply Fillters</Button>
          </div>
        </div>
      )}

      {product && (
        <OffcanvasProduct2
          product={product}
          show={show}
          handleClose={() => {
            setProduct(null);
          }}
          isQuickView={isQuickView}
        />
      )}
    </div>
  );
}
