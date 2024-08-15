import clsx from "clsx";
import React from "react";
import { ReactNode, MouseEventHandler } from "react";

const ICON_SIZES = {
  large: { width: 18, height: 18 },
  medium: { width: 16, height: 16 },
  small: { width: 14, height: 14 },
};

interface ButtonProps {
  variant: "primary" | "outline" | "ghost";
  size: "large" | "medium" | "small";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  onClick: MouseEventHandler<HTMLButtonElement>;
  label?: string;
  disabled?: boolean;
}

export default function Button({
  variant,
  size,
  icon,
  iconPosition = "left",
  onClick,
  label,
  disabled = false,
}: ButtonProps) {
  const baseClasses =
    "flex items-center justify-center transition-all duration-100";
  const variantClasses = clsx({
    "button-primary": variant === "primary",
    "button-outline": variant === "outline",
    "button-ghost": variant === "ghost",
  });
  const sizeClasses = clsx({
    "button-large": size === "large",
    "button-medium": size === "medium",
    "button-small": size === "small",
  });
  const iconMargin = clsx({
    "button-icon": icon && label,
  });

  const { width, height } = ICON_SIZES[size];

  return (
    <button
      onClick={onClick}
      className={clsx(baseClasses, variantClasses, sizeClasses, {
        "flex-row-reverse": iconPosition === "right",
        "cursor-not-allowed": disabled,
      })}
      disabled={disabled}
    >
      {icon && (
        <span className={iconMargin}>
          {icon &&
            React.cloneElement(icon as React.ReactElement, { width, height })}
        </span>
      )}
      {label && <span>{label}</span>}
    </button>
  );
}
