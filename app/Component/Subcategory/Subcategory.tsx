"use client";

import React, {useState, useEffect} from "react";

export default function Subcategory() {
    const [subcategories, setSubcategories] = useState([]);     
    useEffect(() => {
        fetch("http://localhost:3001/subcategories" , {method: "GET",})
            .then((response) => response.json())                
            .then((data) => {
                setSubcategories(data);
            })}
        ,[]);
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
        Sub Category Item
      </h1>
      {subcategories.map((item) => (    
        <div key={item.id} className="flex flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{item.name}</h2>
        </div>
        ))}
    </div>
    );
}


