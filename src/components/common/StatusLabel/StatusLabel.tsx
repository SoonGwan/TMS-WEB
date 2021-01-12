import React, { CSSProperties } from 'react';
import { LabelStatus } from 'enum/Label';
import palette from 'styles/palette';

interface IStatusLabel {
  text: string;
  status: string;
}

const StatusLabel = ({ text, status = LabelStatus.NORMAL }: IStatusLabel) => {
  const statusCheck = () => {
    let color;

    if (status === LabelStatus.NORMAL) {
      color = palette.gray_787878;
    } else if (status === LabelStatus.WARNING) {
      color = palette.orange_DFA864;
    }
    return color;
  };

  const styles: CSSProperties = {
    backgroundColor: statusCheck(),
    color: palette.white_FFFFFF,
    fontWeight: 500,
    padding: '0.15vh 0.3vw',
    fontSize: '12px',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '2px',
  };

  return (
    <>
      <div style={styles}>{text}</div>
    </>
  );
};

export default StatusLabel;
