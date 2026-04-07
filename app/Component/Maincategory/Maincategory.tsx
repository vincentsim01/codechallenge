"use client"

import React, {useState, useEffect} from "react";

export default function Maincategory() {
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [products, setProducts] = useState([]);
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
        console.log("Selected Category ID:", selectedCategoryId);
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
        console.log("Selected Subcategory ID:", selectedSubcategoryId);
        fetch(`http://localhost:3001/brands?subCategoryId=${selectedSubcategoryId}`, {method: "GET",})
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
        console.log("Selected Brand ID:", selectedBrandId);
        fetch(`http://localhost:3001/products?brandId=${selectedBrandId}`, {method: "GET",})
            .then((response) => response.json())
            .then((data) => {
                // Handle the products data as needed
                console.log("Products for selected brand:", data);
                setProducts(data);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            });
        // Handle brand change if needed

    }

    const handleButtonClick = () => {
        // Handle button click event
        alert("Button clicked!");
        // fetch(`http://localhost:3001/products?brandId=${products}`, {method: "GET",})
        //     .then((response) => response.json())
        //     .then((data) => {
        //         // Handle the products data as needed
        //         console.log("Products for selected brand:", data);
        //     })
        //     .catch((error) => {
        //         console.error("Error fetching products:", error);
        //     });
    }
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
        Main Category Item
      </h1>
      <select onChange={handleCategoryChange} className="mt-4 p-2 border border-gray-300 rounded">
          <option value="">Choose From The Options Here</option>
        {categories.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      <select onChange={handleSubcategoryChange} className="mt-4 p-2 border border-gray-300 rounded">
          <option value="">Choose From The Options Here</option>
        {subcategories.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      <select onChange={handleBrandChange} className="mt-4 p-2 border border-gray-300 rounded">
        <option value="">Choose From The Options Here</option>
        {brands.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      {/* <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={handleButtonClick}>
        Click Me
      </button> */}
      {products.map((item) => (
        <div key={item.id} className="flex flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{item.name}</h2>
        </div>
        ))}
    </div>
  );
}