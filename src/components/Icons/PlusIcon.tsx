import React from "react";

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M11 0H9V9H0V11H9V20H11V11H20V9H11V0Z" fill="currentColor" />
    </svg>
  );
}

export default PlusIcon;
