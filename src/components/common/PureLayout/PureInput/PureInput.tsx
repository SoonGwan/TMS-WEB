import React from 'react';
import './PureInput.scss';

interface IPureInput {
  width: string;
  height: string;
  type: string;
  borderColor: string;
  borderPx: number;
  borderRadius: number;
  placeholder: string;
}

const PureInput = ({
  width,
  height,
  type,
  borderColor,
  borderPx,
  borderRadius,
  placeholder,
}: IPureInput) => {
  return (
    <input
      className="PureInput"
      type={type}
      style={{
        width,
        height,
        border: `${borderPx}px solid ${borderColor}`,
        borderRadius: `${borderRadius}px`,
      }}
      placeholder={placeholder}
    />
  );
};

export default PureInput;
