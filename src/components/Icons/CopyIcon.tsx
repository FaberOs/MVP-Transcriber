import React from "react";

function CopyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="19"
      height="20"
      viewBox="0 0 19 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.0233 2H3.4375V0H12.0233C12.5537 0 13.0624 0.210714 13.4375 0.585786L17.8517 5C18.2268 5.37507 18.4375 5.88378 18.4375 6.41421V17H16.4375V6.41421L12.0233 2Z"
        fill="currentColor"
      />
      <path
        d="M0.4375 5C0.4375 3.89543 1.33293 3 2.4375 3H10.5514C11.088 3 11.6021 3.21567 11.9782 3.59853L14.8643 6.53691C15.2317 6.9109 15.4375 7.41416 15.4375 7.93838V18C15.4375 19.1046 14.5421 20 13.4375 20H2.4375C1.33293 20 0.4375 19.1046 0.4375 18V5ZM8.4375 5H2.4375V18H13.4375V10H8.4375V5ZM10.4375 5V8H13.4375V7.93838L10.5514 5H10.4375Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default CopyIcon;
