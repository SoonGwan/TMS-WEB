import React from 'react';
import palette from 'styles/palette';

import './MediumBtn.scss'

interface IMediumBtn {
  title?: string;
  onClick?: React.MouseEventHandler,
  color?: string;
  fontColor?: string;
}

const MediumBtn = ({
  title,
  onClick,
  color = palette.blue_F4F7FB,
  fontColor = palette.black_000000 }: IMediumBtn) => {

  return (
    <button
      className="MediumBtn-btn"
      onClick={onClick}
      style={{
        backgroundColor: color,
        color: fontColor,
      }}
    >{title}</button>
  )
}

export default MediumBtn;