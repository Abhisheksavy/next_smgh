"use client";
import { usePathname } from "next/navigation";

const BreadCrumb = () => {
  const pathname = usePathname();
  console.log("pathname", pathname.replace("/", "").split("-").join(" "));

  return (
    <div className="text-[#03AD92]">
      <a href="/" className="mr-1 text-tealgreen font-bold tracking-[0.16em]">
        Home
      </a>
      {"/"}
      <span className="ml-1 capitalize text-tealgreen font-bold tracking-[0.16em]">
        {pathname[1].toUpperCase() + pathname.slice(2).split("-").join(" ")}
      </span>
    </div>
  );
};

export default BreadCrumb;
