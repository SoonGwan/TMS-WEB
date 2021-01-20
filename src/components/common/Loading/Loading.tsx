import React from 'react';
import './Loading.scss';
import ClipLoader from 'react-spinners/ClipLoader';
import { css } from '@emotion/react';
const Loading = () => {
  return (
    <>
      <div className="Loading">
        <ClipLoader size={120} />
      </div>
    </>
  );
};

export default Loading;
