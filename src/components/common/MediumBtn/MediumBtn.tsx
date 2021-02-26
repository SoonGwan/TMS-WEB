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
  color = palette.gray_444444,
  fontColor = palette.gray_F1F3F5 }: IMediumBtn) => {

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