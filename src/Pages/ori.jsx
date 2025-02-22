

// nfjkdnvjdvj
import React, { useState, useContext, useEffect } from "react";
import { ShopContext } from "../Context/ShopContext.jsx";
import { assets } from "../assets/assets.js";
import Tittle from "../Components/Tittle.jsx";
import ProductItem from "../Components/ProductItem.jsx";

const Collection = () => {
  const { products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  // Toggle Category Selection
  const toggleCategory = (e) => {
    
    console.log("the daaytis ", category);
    
    
    if (category.includes(e.target.value)) {
      const filterdata = filterProducts.filter((item) =>
        category.includes(e.target.value)
      );

      setCategory(filterProducts)
    } else {
      setCategory((prev) => [...prev, e.target.value])
      console.log("this is catagpry", category);
      
    }
  };

  // Toggle SubCategory Selection
  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();
 
    console.log(productsCopy);
    
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category.toUpperCase())
      )
        console.log("yhe product copy ", productsCopy);
      
    }
    setFilterProducts(productsCopy);
  };

  useEffect(() => {
    setFilterProducts(products);
  }, [products]);

  // Reapply Filters when Category or SubCategory Changes
  useEffect(() => {
    applyFilter();
  }, [category, subCategory]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
        <div className="min-w-60">
          {/* Filter Button */}
          <p
            className="MY-2 text-xl flex items-center ccd my-aursor-pointer gap-2"
            onClick={() => setShowFilter(!showFilter)}
          >
            FILTER
            <img
              src={assets.dropdown_icon}
              className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
              alt="dropdown"
            />
          </p>

          {/* Categories Section */}
          <div
            className={`border border-gray-300 pl-5 py-3 mt-6 ${
              showFilter ? "" : "hidden"
            } sm:block`}
          >
            <p className="mb-3 text-sm font-medium">CATEGORIES</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              <p className="flex gap-2">
                <input
                  className="w-3"
                  type="checkbox"
                  value={"MEN"}
                  onChange={toggleCategory}
                />
                MEN
              </p>
              <p className="flex gap-2">
                <input
                  className="w-3"
                  type="checkbox"
                  value={"WOMEN"}
                  onChange={toggleCategory}
                />
                WOMEN
              </p>
              <p className="flex gap-2">
                <input
                  className="w-3"
                  type="checkbox"
                  value={"KIDS"}
                  onChange={toggleCategory}
                />
                KIDS
              </p>
            </div>
          </div>

          {/* Type Section */}
          <div
            className={`border border-gray-300 pl-5 py-3 my-6 ${
              showFilter ? "" : "hidden"
            } sm:block`}
          >
            <p className="mb-3 text-sm font-medium">TYPE</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              <p className="flex gap-2">
                <input
                  className="w-3"
                  type="checkbox"
                  value={"Topwear"}
                  onChange={toggleSubCategory}
                />
                Topwear
              </p>
              <p className="flex gap-2">
                <input
                  className="w-3"
                  type="checkbox"
                  value={"BOTTOMWEAR"}
                  onChange={toggleSubCategory}
                />
                Bottom wear
              </p>
              <p className="flex gap-2">
                <input
                  className="w-3"
                  type="checkbox"
                  value={"Winterwear"}
                  onChange={toggleSubCategory}
                />
                Winter wear
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Tittle text1={"All "} text2={"COLLECTION"} />
          {/* Product Sort */}
          <select className="border-2 border-gray-300 text-sm px-2">
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Map Filtered Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {console.log("the data of filter", category)}
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
