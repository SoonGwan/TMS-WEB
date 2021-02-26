import React, {
  DragEvent as ReactDragEvent,
  MutableRefObject,
  useState,
} from 'react';
import { FileDrop } from 'react-file-drop';
import { useBeforeunload } from 'react-beforeunload';
import classNames from 'classnames/bind';
import { ClassNamesFn } from 'classnames/types';

interface IManageDeliveryList {
  onFileInputChage: (evnet: DragEvent) => void;
  onDropFile: (
    files: FileList | null,
    event: ReactDragEvent<HTMLDivElement>
  ) => void;
  uploadFileName: string;
  excelList: JSX.Element[];
  handleExportExcel: () => void;
  handleDeliveryCreation: () => void;
  donwloadExcelExample: () => void;
  openModal: () => void;
  fileHandler: (e: any) => void;
}

const style = require('./ManageDeliveryList.scss');
const cx: ClassNamesFn = classNames.bind(style);

const ManageDeliveryList = ({
  onFileInputChage,
  onDropFile,
  uploadFileName,
  excelList,
  handleExportExcel,
  handleDeliveryCreation,
  donwloadExcelExample,
  openModal,
  fileHandler,
}: IManageDeliveryList) => {
  useBeforeunload((event) => event.preventDefault());
  const [drag, setDrag] = useState(false);
  return (
    <div className="ManageDeliveryList">
      <div className="ManageDeliveryList-ImportCSVWrapper">
        <div className="ManageDeliveryList-ImportCSVWrapper-ImportSection">
          <input
            className={cx('ExcelUpload', {
              'ExcelUpload-drag': drag === true,
            })}
            type="file"
            onChange={fileHandler}
          />
          <FileDrop
            onFrameDragEnter={(event) => setDrag(true)}
            onFrameDragLeave={(event) => onFileInputChage(event)}
            onFrameDrop={(event) => setDrag(false)}
            onDrop={(event, files) => onDropFile(event, files)}
          >
            <div className="ManageDeliveryList-ImportCSVWrapper-ImportSection-DropDown">
              {uploadFileName}
            </div>
          </FileDrop>
        </div>
        <div className="ManageDeliveryList-ImportCSVWrapper-Section">
          <div
            className="ManageDeliveryList-ImportCSVWrapper-ApplyButton"
            onClick={handleDeliveryCreation}
          >
            업로드 하기
          </div>
          <div
            className="ManageDeliveryList-ImportCSVWrapper-ApplyButton"
            onClick={handleExportExcel}
          >
            유저정보 보기
          </div>
        </div>
      </div>
      <div className="ManageDeliveryList-ViewExcelList">
        <div className="ManageDeliveryList-ViewExcelList-Header">
          <div className="ManageDeliveryList-ViewExcelList-Header-Wrapper">
            <div
              className="ManageDeliveryList-ViewExcelList-Header-ExampleExcel"
              onClick={donwloadExcelExample}
            >
              업로드 엑셀 다운
            </div>
            <div className="ManageDeliveryList-OpenModal" onClick={openModal}>
              따로 물품 업로드 하기
            </div>
          </div>
          <div className="ManageDeliveryList-ViewExcelList-Header-Client">
            고객 고유번호 (고객 이름)
          </div>
          <div className="ManageDeliveryList-ViewExcelList-Header-Driver">
            드라이버 고유번호 (드라이버 이름)
          </div>
          <div className="ManageDeliveryList-ViewExcelList-Header-Product">
            물품 정보
          </div>
        </div>
        <div className="ManageDeliveryList-ViewExcelList-ListWrapper">
          {excelList}
        </div>
      </div>
    </div>
  );
};

export default ManageDeliveryList;
