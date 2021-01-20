import React, { CSSProperties } from 'react';
import './DashBoardCardView.scss';
import classNames from 'classnames/bind';
import { ClassNamesFn } from 'classnames/types';

interface IDashBoardCardView {
  explanation: string;
  condition: string | number;
  width?: string;
  height?: string;
  backgroundColor?: string;
  color?: string;
  className?: string;
}

const style = require('./DashBoardCardView.scss');
const cx: ClassNamesFn = classNames.bind(style);

const DashBoardCardView = ({
  explanation,
  condition,
  width,
  height,
  backgroundColor = '#fff',
}: IDashBoardCardView) => {
  const styles: CSSProperties = {
    width,
    height,
  };
  return (
    <div className={cx('DashBoardCardView')} style={styles}>
      <div className={cx('DashBoardCardView-Explanation')}>{explanation}</div>
      <div className={cx('DashBoardCardView-ConditionWrapper')}>
        <div className={cx('DashBoardCardView-ConditionWrapper-Condition')}>
          {condition}
        </div>
        {/* <div
          className={cx(
            'DashBoardCardView-ConditionWrapper-ComparedPreviousDay',
            {
              'DashBoardCardView-ConditionWrapper-ComparedPreviousDay-Increase':
                comparedYesterday >= 0,
            },
            {
              'DashBoardCardView-ConditionWrapper-ComparedPreviousDay-Reduction':
                comparedYesterday < 0,
            }
          )}
        >
          (
          {comparedYesterday > 0
            ? `+${comparedYesterday}%`
            : `-${comparedYesterday * -1}%`}
          )
        </div> */}
      </div>
    </div>
  );
};

export default DashBoardCardView;
