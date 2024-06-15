import React from "react";

const Button = ({ text, color, background }) => {
  return (
    <button
      className={` h-[38px] rounded-md ${color} ${background} px-4 py-2 text-sm  font-medium  `}
    >
      {text}
    </button>
  );
};

export default Button;
