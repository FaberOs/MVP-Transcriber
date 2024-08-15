import clsx from "clsx";
import React from "react";
import { ReactNode, MouseEventHandler } from "react";

const ICON_SIZES = {
  large: { width: 18, height: 18 },
  medium: { width: 16, height: 16 },
  small: { width: 14, height: 14 },
};

interface IconButtonProps {
  variant: "primary" | "outline" | "ghost";
  size: "large" | "medium" | "small";
  icon?: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export default function IconButton({
  variant,
  size,
  icon,
  onClick,
  disabled = false,
}: IconButtonProps) {
  const baseClasses =
    "flex justify-center items-center rounded-full transition-all duration-100";
  const variantClasses = clsx({
    "button-primary": variant === "primary",
    "button-outline": variant === "outline",
    "button-ghost": variant === "ghost",
  });
  const sizeClasses = clsx({
    "iconButton-large": size === "large",
    "iconButton-medium": size === "medium",
    "iconButton-small": size === "small",
  });

  const { width, height } = ICON_SIZES[size];

  return (
    <button
      onClick={onClick}
      className={clsx(baseClasses, variantClasses, sizeClasses)}
      disabled={disabled}
    >
      {icon &&
        React.cloneElement(icon as React.ReactElement, { width, height })}
    </button>
  );
}
