import React from "react";

const Location: React.FC<LogoProps> = (props) => {
  return (
    <svg
      width="32"
      height="39"
      viewBox="0 0 32 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1 15.4C1 29.8 15.9521 37 15.9521 37C15.9521 37 30.9042 29.8 30.9042 15.4C30.9042 7.45 24.2131 1 15.9521 1C7.69105 1 1 7.45 1 15.4Z"
        stroke="#FCFEFE"
        stroke-width="2"
      />
      <path
        d="M15.9521 20.32C18.7928 20.32 21.0956 18.0098 21.0956 15.16C21.0956 12.3102 18.7928 10 15.9521 10C13.1114 10 10.8086 12.3102 10.8086 15.16C10.8086 18.0098 13.1114 20.32 15.9521 20.32Z"
        stroke="#FCFEFE"
        stroke-width="2"
      />
    </svg>
  );
};

export default Location;
