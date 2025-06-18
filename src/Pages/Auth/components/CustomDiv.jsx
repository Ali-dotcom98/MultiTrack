import React from 'react';

const CustomDiv = () => {
  return (
    <>
      
      <div className="overflow-hidden absolute size-96 scale-150 -translate-x-12 translate-y-12 -rotate-12">
 
        <div className="absolute bg-[#F7F7F7] opacity-10 size-72 -rotate-12 scale-125 rounded-3xl translate-y-56 translate-x-16"></div>
        
        <div className="absolute bg-[#F7F7F7] mt-8 ml-28 opacity-10 size-72 -rotate-45 scale-125 rounded-3xl translate-y-56 translate-x-16"></div>
      </div>


      <div className="absolute rounded-l-3xl opacity-10 right-32 bg-[#F7F7F7] size-48 -top-16 scale-150"></div>
    </>
  );
};

export default CustomDiv;
