import{ useRef, useState } from "react";

const index = ({ length, onComplete }) => {
  // if you're not using Typescript, simply do const inputRef = useRef()

  const inputRef = useRef(Array(length).fill(null));

  // if you're not using Typescript, do useState()
  const [OTP, setOTP] = useState(Array(length).fill(""));

  const handleTextChange = (input, index) => {
    const newPin = [...OTP];
    newPin[index] = input;
    setOTP(newPin);

    // check if the user has entered the first digit, if yes, automatically focus on the next input field and so on.

    if (input.length === 1 && index < length - 1) {
      inputRef.current[index + 1]?.focus();
    }

    if (input.length === 0 && index > 0) {
      inputRef.current[index - 1]?.focus();
    }

    // if the user has entered all the digits, grab the digits and set as an argument to the onComplete function.

    if (newPin.every((digit) => digit !== "")) {
      onComplete(newPin.join(""));
    }
  };

  // return the inputs component

  return (
    <div className={`w-full h-[44px] flex justify-center items-center gap-3`}>
      {Array.from({ length }, (_, index) => (
        <div key={index} className="flex flex-col items-center">
          <input
            type="text"
            maxLength={1}
            value={OTP[index]}
            className={`w-11 h-11 flex-shrink-0 rounded-md border bg-gray-50 text-center text-base font-normal leading-6 font-main border-gray-600`}
            placeholder="-"
            key={index}
            onChange={(e) => handleTextChange(e.target.value, index)}
            ref={(ref) => (inputRef.current[index] = ref)}
          />
        </div>
      ))}
    </div>
  );
};

export default index;
