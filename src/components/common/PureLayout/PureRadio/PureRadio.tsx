import React from 'react';
import './PureRadio.scss';

interface IPureRadio {
  labelText: string;
}

const PureRadio = ({ labelText }: IPureRadio) => {
  return (
    <>
      <label className="PureRadio">
        <span className="PureRadio-Pinput">
          <input type="checkBox" name="PureRadio"></input>
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

export default PureRadio;
