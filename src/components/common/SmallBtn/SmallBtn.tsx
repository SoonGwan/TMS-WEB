import React from 'react';

interface ISmallBtn {
  text: string;
  className?: string;
  onClick?: (value?: any) => void;
  value?: number;
}

const SmallBtn = ({ text, className, onClick, value }: ISmallBtn) => {
  return (
    <button className={className} value={value} onClick={onClick}>
      {text}
    </button>
  );
};

export default SmallBtn;
