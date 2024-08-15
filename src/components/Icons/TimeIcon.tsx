import React from "react";

function TimeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="23"
      height="22"
      viewBox="0 0 23 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M10.75 4V12H16.75V10H12.75V4H10.75Z" fill="currentColor" />
      <path
        d="M22.75 11C22.75 17.0751 17.8251 22 11.75 22C5.67487 22 0.75 17.0751 0.75 11C0.75 4.92487 5.67487 0 11.75 0C17.8251 0 22.75 4.92487 22.75 11ZM20.75 11C20.75 6.02944 16.7206 2 11.75 2C6.77944 2 2.75 6.02944 2.75 11C2.75 15.9706 6.77944 20 11.75 20C16.7206 20 20.75 15.9706 20.75 11Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default TimeIcon;
