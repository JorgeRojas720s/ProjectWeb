import React, { useState } from "react";

interface genericTextAreaProps {
  id?: number;
  //className?: string;
  placeholder: string;
  rows: number;
  cols: number;
  text?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string; 
}
const classNameTextArea = 'resize-none bg-[#013747] outline-none border-l-transparent h-[220px] xl:w-[420px] lg:w-[320px] md:w-[350px] p-5 sm:w-fit m-5 hover:translate-y-[-10px] transition-all duration-200 ease-in-out focus:border-l-8 focus:border-purple-1 rounded-lg'
const GenericTextArea = ({
  id,
  //className,
  placeholder,
  rows,
  cols,
  text,
  value,
 onChange,
 className
}: genericTextAreaProps) => {

  return (
    <textarea
      //className={`${className != null ? className : ""}`}
      className={`resize-none outline-none ${className !== null? className : 'h-[220px]'} xl:w-[420px] lg:w-[320px] md:w-[350px] pl-3 sm:w-fit m-5 transition-all duration-200 ease-in-out focus:border-l-8 focus:border-purple-1 rounded-lg border border-purple-1`}
      placeholder={placeholder}
      rows={rows}
      cols={cols}
      // value={value} 
      onChange={onChange} 
    />
  );
};

export default GenericTextArea;