import React, { Dispatch, SetStateAction, ChangeEvent } from 'react';
import './RadioButton.scss';

interface IRadioButton {
  labelText: string;
  labelValue: any;
  setLabelValue: Dispatch<SetStateAction<any>>;
}

const RadioButton = ({
  labelText,
  labelValue,
  setLabelValue,
}: IRadioButton) => {
  return (
    <>
      <label className="PureRadio">
        <span className="PureRadio-Pinput">
          <input
            type="checkBox"
            name="PureRadio"
            value={labelValue}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setLabelValue(event.target.checked)
            }
          />
          <span className="PureRadio-Pcontrol">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-width="3"
                d="M1.73 12.91l6.37 6.37L22.79 4.59"
              />
            </svg>
          </span>
        </span>
        <span className="PureRadio-Plabel">{labelText}</span>
      </label>
    </>
  );
};

export default RadioButton;
