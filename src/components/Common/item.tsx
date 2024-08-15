"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

function Item({
  link,
  isExpanded,
}: {
  link: { href: string; label: string; icon: JSX.Element };
  isExpanded: boolean;
}) {
  const pathname = usePathname();

  return (
    <Link
      href={link.href}
      className={clsx(
        "flex items-center rounded-md transition-all duration-300",
        pathname === link.href ? "bg-[#FECE82] text-black" : "text-white",
        isExpanded ? "flex-1 px-4 py-2" : "w-10 h-10 justify-center"
      )}
    >
      <span className={clsx("", isExpanded ? "mr-2" : "")}>{link.icon}</span>
      {isExpanded && <span className="text-md">{link.label}</span>}
    </Link>
  );
}

export default Item;
