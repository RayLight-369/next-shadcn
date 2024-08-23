// import Link from "next/link";
"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const CustomLink = ( {
  href,
  className,
  active,
  children
} ) => {

  const pathName = usePathname();

  useEffect( () => console.log( href, pathName ), [] );

  return (
    <Link className={ cn( className, pathName == href ? active : "" ) } href={ href }>{ children }</Link>
  );
};

export default CustomLink;