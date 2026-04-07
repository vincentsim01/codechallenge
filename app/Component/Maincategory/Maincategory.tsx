"use client"

import React, {useState, useEffect} from "react";

export default function Maincategory() {
    const [categories, setCategories] = useState(["C1"]);
    const [subcategories, setSubcategories] = useState(["S1"]);
    const [brands, setBrands] = useState(["B1"]);
    const [products, setProducts] = useState(["P1"]);
    useEffect(() => {
        fetch("http://localhost:3001/categories" , {method: "GET",})
            .then((response) => response.json())    
            .then((data) => {
                setCategories(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);
    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCategoryId = event.target.value;
        fetch(`http://localhost:3001/subcategories?categoryId=${selectedCategoryId}`, {method: "GET",})
            .then((response) => response.json())
            .then((data) => {
                setSubcategories(data);
            })
            .catch((error) => {
                console.error("Error fetching subcategories:", error);
            });
    }

    const handleSubcategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedSubcategoryId = event.target.value;
        fetch(`http://localhost:3001/brands?subcategoryId=${selectedSubcategoryId}`, {method: "GET",})
            .then((response) => response.json())
            .then((data) => {
                // Handle the items data as needed
                setBrands(data);
            })
            .catch((error) => {
                console.error("Error fetching items:", error);
            });
        // Handle subcategory change if needed
    }

    const handleBrandChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedBrandId = event.target.value;
        // Handle brand change if needed
        setProducts(selectedBrandId);
    }

    const handleButtonClick = () => {
        // Handle button click event
        fetch(`http://localhost:3001/products?brandId=${products}`, {method: "GET",})
            .then((response) => response.json())
            .then((data) => {
                // Handle the products data as needed
                console.log("Products for selected brand:", data);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            });
    }
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
        Main Category Item
      </h1>
      <select onChange={handleCategoryChange} className="mt-4 p-2 border border-gray-300 rounded">
        {categories.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      <select onChange={handleSubcategoryChange} className="mt-4 p-2 border border-gray-300 rounded">
        {subcategories.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      <select onChange={handleBrandChange} className="mt-4 p-2 border border-gray-300 rounded">
        {brands.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={handleButtonClick}>
        Click Me
      </button>

    </div>
  );
}