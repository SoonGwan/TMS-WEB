import React, { CSSProperties } from 'react';
import palette from 'styles/palette';

interface IWideButton {
  className: string;
  text: string;
  backgroundColor?: string;
  fontColor?: string;
  buttonClick: () => void;
  fontSize?: string;
}

const WideButton = ({
  className,
  text,
  backgroundColor = palette.blue_E2E8F1,
  fontColor = palette.black_000000,
  buttonClick,
  fontSize = '16px',
}: IWideButton) => {
  const styles: CSSProperties = {
    backgroundColor,
    color: fontColor,
    padding: '8px 0px',
    fontSize,
    border: 'none',
    cursor: 'pointer',
  };
  return (
    <button className={className} style={styles} onClick={buttonClick}>
      <div>{text}</div>
    </button>
  );
};

export default WideButton;
