"use client"

import React, {useState, useEffect} from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";


export default function Maincategory() {
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubcategory, setSelectedSubcategory] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("");
    const [allproducts, setAllProducts] = useState([]);
    const searchParams = useSearchParams();
    const selectedCategoryparam = searchParams.get("category") || "";
    const selectedSubcategoryparam = searchParams.get("subcategory") || "";
    const selectedBrandparam = searchParams.get("brand") || "";


    const router = useRouter();
    useEffect(() => {
        fetch("http://localhost:3001/categories" , {method: "GET",})
            .then((response) => response.json())    
            .then((data) => {
                setCategories(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });


          fetch("http://localhost:3001/products" , {method: "GET",})
            .then((response) => response.json())    
            .then((data) => {
                setAllProducts(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

useEffect(() => {
  if (selectedCategoryparam) {
    fetch(`http://localhost:3001/subcategories?categoryId=${selectedCategoryparam}`)
      .then(res => res.json())
      .then(setSubcategories);
  }
}, [selectedCategoryparam]);

useEffect(() => {
  if (selectedSubcategoryparam) {
    fetch(`http://localhost:3001/brands?subCategoryId=${selectedSubcategoryparam}`)
      .then(res => res.json())
      .then(setBrands);
  }
}, [selectedSubcategoryparam]);

useEffect(() => {
  if (selectedBrandparam) {
    fetch(`http://localhost:3001/products?brandId=${selectedBrandparam}`)
      .then(res => res.json())
      .then(setProducts);
  }
}, [selectedBrandparam]);

    const updateURL = (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      } 

      // Reset cascading
      if (key === "category") {
        params.delete("subcategory");
        params.delete("brand");
      }
      if (key === "subcategory") {
        params.delete("brand");
      }

      router.replace(`?${params.toString()}`);
    };

  const resetFilters = () => {
    router.replace("?");
  };


    // const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     const selectedCategoryId = event.target.value;
    //     if (selectedCategoryId === "All") {
    //         setSelectedCategory("");
    //         setSelectedSubcategory("");
    //         setSelectedBrand("");
    //         // setCategories([]);
    //         setSubcategories([]);
    //         setBrands([]);
    //         setProducts([]);
    //         return;
    //     } else {
    //         setSelectedCategory(selectedCategoryId);
    //         setSelectedSubcategory("");
    //         setSelectedBrand("");
    //     }
    //     console.log("Selected Category ID:", selectedCategoryId);
    //     fetch(`http://localhost:3001/subcategories?categoryId=${selectedCategoryId}`, {method: "GET",})
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setSubcategories(data);
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching subcategories:", error);
    //         });
    // }

    // const handleSubcategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     const selectedSubcategoryId = event.target.value;
    //     if (selectedSubcategoryId === "All") {
    //         setSelectedSubcategory("");
    //         setSelectedBrand("");
    //         setSubcategories([]);
    //         setBrands([]);
    //         setProducts([]);
    //         return;
    //     }

    //     setSelectedSubcategory(selectedSubcategoryId);
    //     setSelectedBrand("");
    //     console.log("Selected Subcategory ID:", selectedSubcategoryId);
    //     fetch(`http://localhost:3001/brands?subCategoryId=${selectedSubcategoryId}`, {method: "GET",})
    //         .then((response) => response.json())
    //         .then((data) => {
    //             // Handle the items data as needed
    //             setBrands(data);
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching items:", error);
    //         });
    //     // Handle subcategory change if needed
    // }

    // const handleBrandChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     const selectedBrandId = event.target.value;
    //     if (selectedBrandId === "All") {
    //         setSelectedBrand("");
    //         setBrands([]);
    //         setProducts([]);
    //         return;
    //     }
    //     setSelectedBrand(selectedBrandId);
    //     console.log("Selected Brand ID:", selectedBrandId);
    //     fetch(`http://localhost:3001/products?brandId=${selectedBrandId}`, {method: "GET",})
    //         .then((response) => response.json())
    //         .then((data) => {
    //             // Handle the products data as needed
    //             console.log("Products for selected brand:", data);
    //             setProducts(data);
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching products:", error);
    //         });
    //     // Handle brand change if needed

    // }

    // const handleButtonResetClick = () => {
    //     // Handle button click event
    //     setSubcategories([]);
    //     setBrands([]);
    //     setProducts([]);
    //     setSelectedBrand("");
    //     setSelectedSubcategory("");
    //     setSelectedCategory("");
    // }
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <nav className="product-breadcrumb" aria-label="breadcrumb">
         Home 
          {selectedCategoryparam && ` > ${categories.find(categories => categories.id === selectedCategoryparam)?.name || ''}`}
          {selectedSubcategoryparam && ` > ${subcategories.find(subcategories => subcategories.id === selectedSubcategoryparam)?.name || ''}`}
          {selectedBrandparam && ` > ${brands.find(brands => brands.id === selectedBrandparam)?.name || ''}`}
      </nav> 
      <br></br> 
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white animate-bounce">
        Main Category Item
      </h1>
      <br></br>
      <div className="flex items-center justify-center gap-3 bg-zinc-50 font-sans dark:bg-black p-5 rounded-lg border border-gray-300">
      <select value={selectedCategoryparam || "All"} onChange={(e) => updateURL("category", e.target.value)} className="mt-4 p-2 border border-gray-300 rounded" name="category">
          <option value="All">Choose Category</option>
        {categories.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      <select value={selectedSubcategoryparam || "All"} onChange={(e) => updateURL("subcategory", e.target.value)} className="mt-4 p-2 border border-gray-300 rounded" name="subcategory">
          <option value="All">Choose Sub Category</option>
        {subcategories.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      <select value={selectedBrandparam || "All"}  onChange={(e) => updateURL("brand", e.target.value)} className="mt-4 p-2 border border-gray-300 rounded" name="brand">
        <option value="All">Choose Brand</option>
        {brands.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      </div>
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={resetFilters}>
        Reset
      </button>
      <br></br>
      <div className='flex justify-center p-5 gap-5'>
      { 
       selectedBrandparam!== "" ?         
       products.map((item) => (
        <section key={item.id} className='inline'>
            <div key={item.id} className="flex flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black p-5 rounded-lg border border-gray-300">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{item.name}</h2>
              <br></br>
              <p className="text-gray-700 dark:text-gray-300">Rp{item.price.toFixed(2)}</p>
            </div>
        </section>)) 
        : allproducts.map((item) => (
        <section key={item.id} className='inline'>
            <div key={item.id} className="flex flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black p-5 rounded-lg border border-gray-300 ">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{item.name}</h2>
              <br></br>
              <p className="text-gray-700 dark:text-gray-300">Rp{item.price.toFixed(2)}</p>
            </div>
        </section>))
      }
      </div>


    </div>
  );
}