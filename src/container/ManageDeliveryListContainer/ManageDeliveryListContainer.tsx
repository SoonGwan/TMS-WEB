import React, {
  useState,
  DragEvent as ReactDragEvent,
  useCallback,
} from 'react';
import ManageDeliveryList from 'components/ManageDeliveryList';
import XLSX from 'xlsx';
import { IExcelItem } from 'interface/ManageDeliveryList';
import ManageDeliveryListInnerItemTemplate from 'components/ManageDeliveryList/ManageDeliveryListInnerItemTemplate';
import ManageDeliveryListRepository from 'repository/ManageDeliveryListRepository';
import dtil from 'dtil';
import { ShowToast } from 'util/ShowToast';
import { Colors, Icon } from '@class101/ui';
import MemberRepository from 'repository/MemberRepository';
import {
  EmptyArray,
  failedUploadProduct,
  successUploadProduct,
} from 'validation/ManageDeliveryValidation';
import ManageDeliveryListModalContainer from './ManageDeliveryListModalContainer';
import Loading from 'components/common/Loading';
import { IDriverWithCount, INewCustomerElement } from 'interface/Member';

const ManageDeliveryListContainer = () => {
  const [uploadFileName, setUploadFileName] = useState('');
  const [excelToJSON, setExcelToJSON] = useState<IExcelItem[]>([]);
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const [isLoading, setIsLoading] = useState<Boolean>(false);


  const excelSerialDateToJSDate = (excelSerialDate: number) => {
    const daysBeforeUnixEpoch = 70 * 365 + 19;
    const hour = 60 * 60 * 1000;
    return new Date(Math.round((excelSerialDate - daysBeforeUnixEpoch) * 24 * hour) + 12 * hour);
  };

  const onFileChanged = (e: any) => {
    const file = e.target.files;
    handleFetchFile(file);
  };

  const handleFetchFile = useCallback((files: FileList | null) => {
    setIsLoading(true);
    if (files === null || files.length !== 1) {
      return;
    }

    const [file] = files;
    const reader: FileReader = new FileReader();

    reader.onload = () => {
      console.log('pass');

      const data = reader.result;

      const workbook = XLSX.read(data, { type: 'binary' });

      for (const sheet of workbook.SheetNames) {
        const excelToJson: IExcelItem[] = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        if (excelToJson.length <= 0) {
          failedUploadProduct('파일의 값이 없습니다.');
          return;
        }

        for (const excelItem of excelToJson) {
          if (!excelItem.customerIdx) {
            setIsLoading(false);
            failedUploadProduct('파일을 읽을 수 없습니다.');
            setExcelToJSON([]);
            return;
          }

          excelItem.createdAt = excelSerialDateToJSDate(Number(excelItem.createdAt));
          console.log(excelItem.createdAt);

          if (isNaN(Date.parse(excelItem.createdAt.toString()))) {
            setIsLoading(false);
            failedUploadProduct('파일의 날짜 형식이 잘못되었습니다.');
            setExcelToJSON([]);
            return;
          }
        }

        setIsLoading(false);

        ShowToast({
          backgroundColor: Colors.green500,
          message: '성공적으로 물품 정보를 가져왔습니다.',
          icon: <Icon.CheckCircle fillColor={Colors.white} />,
          timeout: 3000,
        });
        setUploadFileName(files[0].name);
        setExcelToJSON(excelToJson);
      }
    }

    reader.readAsBinaryString(file);
  }, [])

  const handleExportMemberExcel = useCallback(async () => {
    try {
      setIsLoading(true);

      const customerRes = await MemberRepository.getCustomers();
      const { customers }: { customers: INewCustomerElement[] } = customerRes.data.data;

      const driverRes = await MemberRepository.getDrivers();
      const { drivers }: { drivers: IDriverWithCount[] } = driverRes.data.data;

      const today = dtil().format('YYYY-MM-DD');
      const excelUserHeader = ['고객 고유 번호', '이름', '주소', '전화번호'];
      const excelBlank = [''];
      const excelDriverHeader = [
        '아이디',
        '이름',
        '전화번호',
        '트럭 이름',
        '적재함 사이즈',
      ];

      const excelInfoList: string[][] = [];
      excelInfoList.push(excelUserHeader);

      for (const customer of customers) {
        excelInfoList.push(Object.values(customer));
      }

      excelInfoList.push(excelBlank);
      excelInfoList.push(excelDriverHeader);

      for (const driver of drivers) {
        const excelDriver = {
          ...driver,
        } as any;

        delete excelDriver.totalCount;
        delete excelDriver.completedCount;

        excelInfoList.push(Object.values(excelDriver));
      }

      const workSheetData = excelInfoList;
      const workSheet = XLSX.utils.aoa_to_sheet(workSheetData);
      const workBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workBook, workSheet, 'sheet title');
      setIsLoading(false);

      XLSX.writeFile(workBook, `${today} 회원 정보.xlsx`);
    } catch (err) {
      setIsLoading(false);

      return err;
    }
  }, []);

  const handleDeliveryCreation = useCallback(async () => {
    try {
      setIsLoading(true);

      const deliveries = [];

      for (let i = 0; i < excelToJSON.length; i += 1) {
        const { customerIdx, driverId, productName, createdAt } = excelToJSON[i];


        const item = {
          customerIdx,
          driverId,
          productName,
          createdAt,
        };

        deliveries.push(item);
      }

      if (deliveries.length <= 0) {
        setIsLoading(false);
        EmptyArray();
        return;
      }

      const res = await ManageDeliveryListRepository.deliveryCreation(
        deliveries as any
      );

      const { status } = res;
      successUploadProduct(status);
      setIsLoading(false);

      setExcelToJSON([]);
      setUploadFileName('');
    } catch (err) {
      const { status } = err.response;
      failedUploadProduct(status);
      setIsLoading(false);
    }
  }, [excelToJSON]);

  const openModal = () => {
    setIsOpen(!isOpen);
  };

  const excelList = excelToJSON.map((data: IExcelItem) => {
    const {
      customerIdx,
      customerName,
      driverId,
      driverName,
      productName,
      createdAt,
    } = data;

    return (
      <>
        <ManageDeliveryListInnerItemTemplate
          customerIdx={customerIdx}
          customerName={customerName}
          driverId={driverId}
          driverName={driverName}
          productName={productName}
          createdAt={createdAt}
        />
      </>
    );
  });

  return (
    <>
      {isLoading && <Loading />}
      <ManageDeliveryList
        onDropFile={handleFetchFile}
        uploadFileName={uploadFileName || '파일을 드롭하거나 클릭해 주세요.'}
        excelList={excelList}
        handleExportMemberExcel={handleExportMemberExcel}
        handleDeliveryCreation={handleDeliveryCreation}
        openModal={openModal}
        onFileChanged={onFileChanged}
      />
      {isOpen && <ManageDeliveryListModalContainer openModal={openModal} />}
    </>
  );
};

export default ManageDeliveryListContainer;
