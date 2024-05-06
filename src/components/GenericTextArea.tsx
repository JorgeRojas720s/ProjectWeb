import React, { useState } from "react";

interface genericTextAreaProps {
  id: number;
  //className?: string;
  placeholder: string;
  rows: number;
  cols: number;
  text?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void; 
}

const GenericTextArea = ({
  id,
  //className,
  placeholder,
  rows,
  cols,
  text,
  value,
  onChange,
}: genericTextAreaProps) => {
  const [textArea, setTextArea] = useState("");

  return (
    <textarea
      //className={`${className != null ? className : ""}`}
      className="w-auto bg-[#013747] border-l-transparent text-white font-bold 
      resize-none max-h-[150px] py-2 px-4 mb-6 outline-none transition-all duration-200 ease-in-out focus:border-l-8 focus:border-purple-1 rounded-r-lg"
      placeholder={placeholder}
      rows={rows}
      cols={cols}
      value={value} 
      onChange={onChange} 
    />
  );
};

export default GenericTextArea;
