import React, { CSSProperties } from 'react';
import palette from 'styles/palette';

interface IMediumBtn {
  title?: string;
  onClick?: React.MouseEventHandler,
  color?: string;
  fontColor?: string;
  className?: string;
}

const MediumBtn = ({
  title,
  onClick,
  className = 'MediumBtn',
  color = palette.blue_F4F7FB,
  fontColor = palette.black_000000 }: IMediumBtn) => {

  const styles: CSSProperties = {
    backgroundColor: color,
    color: fontColor,
    fontSize: '12px',
    minWidth: '5rem',
    padding: '8px',
    border: 'none',
    cursor: 'pointer',
  }

  return (
    <button
      onFocus={e => e.target.style.outline = 'none'}
      className={className}
      onClick={onClick}
      style={styles}
    >{title}</button>
  )
}

export default MediumBtn;