"use client";

import { ASIDE_LINKS, ASIDE_EXPANDED_ROUTES } from "@/utils/constants";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import { UploadModal } from "@/components/Common/Modal";
import LogoComplete from "../Icons/LogoComplete";
import FavIcon from "../Icons/FavIcon";
import IconButton from "@/components/Common/IconButton";
import Button from "@/components/Common/Button";
import PlusIcon from "../Icons/PlusIcon";
import Item from "@/components/Common/item";

export default function Aside() {
  const pathname = usePathname();
  const isExpandedRoute = ASIDE_EXPANDED_ROUTES.includes(pathname);
  const [isExpanded, setIsExpanded] = useState(isExpandedRoute);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsExpanded(isExpandedRoute);
  }, [isExpandedRoute]);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <aside
        className={clsx(
          "bg-[#313131] p-4 flex flex-col fixed left-0 top-0 bottom-0 transition-all duration-300",
          isExpanded ? "w-56" : "w-16 items-center"
        )}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(isExpandedRoute)}
      >
        <div
          className={clsx(
            "flex items-center mb-10 mt-[24px]",
            isExpanded ? "justify-start" : "justify-center"
          )}
        >
          {isExpanded ? (
            <LogoComplete height={25} width={75} />
          ) : (
            <FavIcon height={25} width={22} />
          )}
        </div>
        <ul
          className={clsx(
            "flex flex-col gap-1",
            isExpanded ? "flex-1" : "items-center"
          )}
        >
          <li className="flex mb-10">
            {isExpanded ? (
              <Button
                variant="outline"
                size="large"
                icon={<PlusIcon />}
                iconPosition="left"
                onClick={handleButtonClick}
                label="Nuevo"
              />
            ) : (
              <IconButton
                variant="outline"
                size="large"
                icon={<PlusIcon />}
                onClick={handleButtonClick}
              />
            )}
          </li>
          {ASIDE_LINKS.map((link, index) => (
            <li className="flex" key={index}>
              <Item link={link} isExpanded={isExpanded} />
            </li>
          ))}
        </ul>
      </aside>
      <UploadModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}
