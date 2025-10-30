import React from "react";

const EmailIcon: React.FC<LogoProps> = (props) => {
  return (
    <svg
      width="38"
      height="32"
      viewBox="0 0 38 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1 1H36.2869V30.5H1V1Z"
        stroke="#FCFEFE"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M36.2869 6.8999L18.6435 18.6999L1 6.8999"
        stroke="#FCFEFE"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default EmailIcon;
