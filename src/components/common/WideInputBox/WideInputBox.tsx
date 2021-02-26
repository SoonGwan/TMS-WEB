import React, {
  CSSProperties,
  Dispatch,
  SetStateAction,
  ChangeEvent,
} from 'react';
import palette from 'styles/palette';

interface IWideInputBox {
  className?: string;
  type: string;
  placeholder: string;
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  backgroundColor?: string;
  fontColor?: string;
  boldColor?: string;
  border?: number;
  padding?: string;
}

const WideInputBox = ({
  className,
  type,
  placeholder,
  inputValue,
  setInputValue,
  backgroundColor = palette.white_FFFFFF,
  fontColor = palette.black_000000,
  boldColor = palette.blue_E2E8F1,
  border = 1,
  padding = '0px 20px',
}: IWideInputBox) => {
  const styles: CSSProperties = {
    backgroundColor,
    color: fontColor,
    border: `solid ${border}px ${boldColor} `,
    padding,
  };
  return (
    <input
      className={className}
      style={styles}
      type={type}
      placeholder={placeholder}
      value={inputValue}
      onChange={(event: ChangeEvent<HTMLInputElement>) =>
        setInputValue(event.target.value)
      }
    />
  );
};

export default WideInputBox;
