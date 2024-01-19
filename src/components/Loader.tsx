import React from "react";

const Loader = ({ className = "" }) => {
  return (
    <div className={`flex gap-4 justify-center mt-10 ${className}`}>
      <div className="w-2 h-2 animate-ping rounded-full bg-gray-500"></div>
      <div className="w-2 h-2 animate-ping rounded-full bg-gray-500"></div>
      <div className="w-2 h-2 animate-ping rounded-full bg-gray-500"></div>
    </div>
  );
};

export default Loader;
