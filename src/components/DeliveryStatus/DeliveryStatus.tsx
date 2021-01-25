import DashBoardCardView from 'components/common/DashBoardCardView';
import DeliveryStatusListItemTemplate from './DeliveryStatusListItemTemplate';
import SmallBtn from 'components/common/SmallBtn';
import React, { CSSProperties, Dispatch, SetStateAction } from 'react';
import classNames from 'classnames/bind';
import { ClassNamesFn } from 'classnames/types';
import { DeliveryTable } from 'enum/DeliveryTable';
import { useRecoilValue } from 'recoil';
import { allProductList } from 'atom/DeliveryStatusAtom';
import dtil from 'dtil';

interface IDeliveryStatus {
  tableValue: number;
  handleTableValue: (value: number) => void;
  tableHeaderText: (arg: number) => JSX.Element | null;
  date: string;
  setDate: Dispatch<SetStateAction<string>>;
  driverListElement: HTMLElement | undefined;
  deliveriesInfoElement: HTMLElement | undefined;
  deliveriesListLeng: number;
  selectedDriverName: string;
  distance: number | undefined;
}

const style = require('./DeliveryStatus.scss');
const cx: ClassNamesFn = classNames.bind(style);

const DeliveryStatus = ({
  handleTableValue,
  tableValue,
  tableHeaderText,
  date,
  setDate,
  driverListElement,
  deliveriesInfoElement,
  deliveriesListLeng,
  selectedDriverName,
  distance,
}: IDeliveryStatus) => {
  const product = useRecoilValue(allProductList);
  const today = dtil().format('YYYY-MM-DD');
  return (
    <>
      <div className={cx('DeliveryStatus')}>
        <div className={cx('DeliveryStatus-OverView')}>
          <div className={cx('DeliveryStatus-OverView-Date')}>
            <input
              className={cx('DeliveryStatus-OverView-Date-DatePicker')}
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className={cx('DeliveryStatus-OverView-CardView')}>
            <DashBoardCardView
              explanation="전체 물류 개수"
              condition={product.length}
            />
            <DashBoardCardView
              explanation="배송중인 물류 개수"
              condition={
                product.filter((element) => element.endTime === null).length
              }
            />
            <DashBoardCardView
              explanation="배송 완료 개수"
              condition={
                product.filter((element) => element.endTime !== null).length
              }
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
                {tableHeaderText(tableValue)}
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
                  'DeliveryStatus-OverView-AllItemsList-Header-Address'
                )}
              >
                주소
              </div>
              <div
                className={cx(
                  'DeliveryStatus-OverView-AllItemsList-Header-Product'
                )}
              >
                상품명
              </div>
            </div>
            <div
              className={cx('DeliveryStatus-OverView-AllItemsList-ListItem')}
            >
              <DeliveryStatusListItemTemplate tableValue={tableValue} />
            </div>
          </div>
        </div>
        <div className={cx('DeliveryStatus-SubInfo')}>
          <div className={cx('DeliveryStatus-SubInfo-DriverList')}>
            <div className={cx('DeliveryStatus-SubInfo-DriverList-Header')}>
              배송기사 리스트
            </div>
            <div
              className={cx('DeliveryStatus-SubInfo-DriverList-ItemWrapper')}
            >
              <div
                className={cx(
                  'DeliveryStatus-SubInfo-DriverList-ItemWrapper-Header'
                )}
              >
                <div
                  className={cx(
                    'DeliveryStatus-SubInfo-DriverList-ItemWrapper-Header-DriverName'
                  )}
                >
                  배송기사
                </div>
                <div
                  className={cx(
                    'DeliveryStatus-SubInfo-DriverList-ItemWrapper-Header-PhoneNumber'
                  )}
                >
                  전화번호
                </div>
                <div
                  className={cx(
                    'DeliveryStatus-SubInfo-DriverList-ItemWrapper-Header-TruckNumber'
                  )}
                >
                  차량 번호
                </div>
                <div
                  className={cx(
                    'DeliveryStatus-SubInfo-DriverList-ItemWrapper-Header-Product'
                  )}
                >
                  배달 현황
                </div>
              </div>
              <div
                className={cx(
                  'DeliveryStatus-SubInfo-DriverList-ItemWrapper-Section'
                )}
              >
                <div>{driverListElement}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(DeliveryStatus);
