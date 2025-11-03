"use client";
import { usePathname } from "next/navigation";

const BreadCrumb = () => {
  const pathname = usePathname();

  return (
    <div className="text-[#03AD92]">
      <a href="/" className="mr-1">
        Home
      </a>
      {"/"}
      <span className="ml-1">
        {pathname[1].toUpperCase() + pathname.slice(2)}
      </span>
    </div>
  );
};

export default BreadCrumb;
