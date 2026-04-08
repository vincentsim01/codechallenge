import Image from "next/image";
import Maincategory from "./Component/Maincategory/Maincategory";
import Subcategory from "./Component/Subcategory/Subcategory";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <br></br>
      {/* <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Welcome To Our Product List</h1> */}
      <section>
        <Maincategory />
      </section>

    </div>
  );
}
