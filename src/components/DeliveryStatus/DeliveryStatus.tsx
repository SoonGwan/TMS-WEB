import DashBoardCardView from 'components/common/DashBoardCardView';
import palette from 'styles/palette';
import DeliveryStatusListItemTemplate from './DeliveryStatusListItemTemplate';
import SmallBtn from 'components/common/SmallBtn';
import React, { CSSProperties } from 'react';
import classNames from 'classnames/bind';
import { ClassNamesFn } from 'classnames/types';
import { DatePicker } from '@class101/ui';
import { DeliveryTable } from 'enum/DeliveryTable';

interface IDeliveryStatus {
  today: Date;
  tableValue: number;
  handleTableValue: (value: number) => void;
}

const styles: CSSProperties = {
  width: '17.6vw',
  verticalAlign: 'top',
  boxShadow: '1px 4px 24px rgba(0, 0, 0,0.1)',
};

const style = require('./DeliveryStatus.scss');
const cx: ClassNamesFn = classNames.bind(style);

const DeliveryStatus = ({
  today,
  handleTableValue,
  tableValue,
}: IDeliveryStatus) => {
  return (
    <>
      <div className={cx('DeliveryStatus')}>
        <div className={cx('DeliveryStatus-OverView')}>
          <div className={cx('DeliveryStatus-OverView-Date')}>
            <DatePicker
              style={styles}
              adjustInputWidth={false}
              highlightWeekEnd
              maxDate={today}
              value={today}
            />
          </div>
          <div className={cx('DeliveryStatus-OverView-CardView')}>
            <DashBoardCardView
              explanation="전체 물류 개수"
              condition="1,000,000"
              comparedYesterday={2.6}
            />
            <DashBoardCardView
              explanation="배송중인 물류 개수"
              condition="700,000"
              comparedYesterday={-2.6}
            />
            <DashBoardCardView
              explanation="배송 완료 개수"
              condition="300,000"
              comparedYesterday={2.6}
            />
          </div>
          <div className={cx('DeliveryStatus-OverView-AllItemsList')}>
            <div
              className={cx(
                'DeliveryStatus-OverView-AllItemsList-TitleWrapper'
              )}
            >
              <div
                className={cx(
                  'DeliveryStatus-OverView-AllItemsList-TitleWrapper-Title'
                )}
              >
                여기 타이틀이요
              </div>
              <div
                className={cx(
                  'DeliveryStatus-OverView-AllItemsList-TitleWrapper-ButtonSection'
                )}
              >
                <SmallBtn
                  className={cx(
                    'DeliveryStatus-OverView-AllItemsList-TitleWrapper-ButtonSection-Button',
                    {
                      'DeliveryStatus-OverView-AllItemsList-TitleWrapper-ButtonSection-Button-Selected':
                        DeliveryTable.ALL === tableValue,
                    }
                  )}
                  text="전체보기"
                  onClick={() => handleTableValue(DeliveryTable.ALL)}
                />
                <SmallBtn
                  className={cx(
                    'DeliveryStatus-OverView-AllItemsList-TitleWrapper-ButtonSection-Button',
                    {
                      'DeliveryStatus-OverView-AllItemsList-TitleWrapper-ButtonSection-Button-Selected':
                        DeliveryTable.DELIVERING === tableValue,
                    }
                  )}
                  text="배송중"
                  onClick={() => handleTableValue(DeliveryTable.DELIVERING)}
                />
                <SmallBtn
                  className={cx(
                    'DeliveryStatus-OverView-AllItemsList-TitleWrapper-ButtonSection-Button',
                    {
                      'DeliveryStatus-OverView-AllItemsList-TitleWrapper-ButtonSection-Button-Selected':
                        DeliveryTable.DONE === tableValue,
                    }
                  )}
                  text="배송 완료"
                  onClick={() => handleTableValue(DeliveryTable.DONE)}
                />
              </div>
            </div>
            <div className={cx('DeliveryStatus-OverView-AllItemsList-Header')}>
              <div
                className={cx(
                  'DeliveryStatus-OverView-AllItemsList-Header-DriverId'
                )}
              >
                배송 기사
              </div>
              <div
                className={cx(
                  'DeliveryStatus-OverView-AllItemsList-Header-ClientId'
                )}
              >
                고객 이름
              </div>
              <div
                className={cx(
                  'DeliveryStatus-OverView-AllItemsList-Header-Distance'
                )}
              >
                배송 거리
              </div>
              <div
                className={cx(
                  'DeliveryStatus-OverView-AllItemsList-Header-StartAdress'
                )}
              >
                배송 시작 주소
              </div>
            </div>
            <div
              className={cx('DeliveryStatus-OverView-AllItemsList-ListItem')}
            >
              <DeliveryStatusListItemTemplate tableValue={tableValue} />
            </div>
          </div>
        </div>
        <div className={cx('DeliveryStatus-SubInfo')}>aㄴ</div>
      </div>
    </>
  );
};

export default DeliveryStatus;
