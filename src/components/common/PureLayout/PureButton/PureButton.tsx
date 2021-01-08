import React from 'react';
import './PureButton.scss';

interface IPureButton {
  width: string;
  height: string;
  backgroundColor: string;
  borderRadius: number;
  fontSize: string;
  fontColor: string;
  text: string;
  border: string;
}

const PureButton = ({
  width,
  height,
  backgroundColor,
  borderRadius,
  fontSize,
  fontColor,
  text,
  border,
}: IPureButton) => {
  return (
    <button
      className="PureButton"
      style={{
        width,
        height,
        backgroundColor,
        borderRadius,
        fontSize,
        color: fontColor,
        border,
      }}
    >
      <div>{text}</div>
    </button>
  );
};

export default PureButton;
