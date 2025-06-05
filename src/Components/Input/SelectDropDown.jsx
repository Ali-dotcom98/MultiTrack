import React, { useState } from 'react';
import { LuChevronDown, LuChevronUp } from "react-icons/lu";

const SelectDropDown = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setisOpen] = useState(false);

  const handleChange = (option) => {
    onChange(option);
    setisOpen(false);
  };

  return (
    <div className='relative w-full'>
      <button
        type="button"
        className='w-full text-sm text-black outline-none bg-white border border-slate-100 px-2.5 py-3 rounded-md mt-2 flex justify-between items-center'
        onClick={() => setisOpen(!isOpen)}
      >
        <span>
          {value ? options.find((opt) => opt.value === value)?.label : placeholder}
        </span>
        <span className="ml-2 w-5 h-5 flex items-center justify-center">
          {isOpen ? <LuChevronUp /> : <LuChevronDown />}
        </span>
      </button>

      {isOpen && (
        <div className='absolute w-full bg-white border border-slate-100 rounded-md mt-1 shadow-md z-10'>
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleChange(option.value)}
              className='px-3 py-2 text-sm cursor-pointer hover:bg-gray-100'
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectDropDown;
