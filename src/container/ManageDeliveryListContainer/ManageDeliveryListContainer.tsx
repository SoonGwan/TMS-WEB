import React, {
  useState,
  DragEvent as ReactDragEvent,
  useRef,
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
import DeliveryListModal from 'components/ManageDeliveryList/DeliveryListModal';
import ManageDeliveryListModalContainer from './ManageDeliveryListModalContainer';
import Loading from 'components/common/Loading';

const ManageDeliveryListContainer = () => {
  const [uploadFileName, setUploadFileName] = useState('');
  const [excelToJSON, setExcelToJSON] = useState<IExcelItem[]>([]);
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [file, setFile] = useState<any>();

  let list: any = [];

  const onFileInputChage = (event: DragEvent) => {
    /**
     * 추후 필요한 로직이 들어갈 함수입니다.
     */
  };

  const fileHandler = (e: any) => {
    const file = e.target.files;
    onDropFile(file);
  };

  const onDropFile = (
    files: FileList | null,
    event?: ReactDragEvent<HTMLDivElement>
  ) => {
    setIsLoading(true);
    if (files !== null && files.length > 0) {
      for (let i = 0; i !== files.length; i += 1) {
        let file = files[i];

        const reader: FileReader = new FileReader();

        reader.onload = () => {
          const data = reader.result;
          const workbook = XLSX.read(data, { type: 'binary' });
          workbook.SheetNames.forEach((item) => {
            const excelToJson: IExcelItem[] = XLSX.utils.sheet_to_json(
              workbook.Sheets[item]
            );

            if (!excelToJson[0].customerIdx) {
              setIsLoading(false);

              ShowToast({
                backgroundColor: Colors.redError,
                message: '엑셀을 정상적으로 가져올 수 없습니다.',
                icon: <Icon.Alert fillColor={Colors.white} />,
                timeout: 3000,
              });

              return;
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
          });
        };

        reader.readAsBinaryString(file);
      }
    }
  };

  const excelList = excelToJSON.map((data: IExcelItem) => {
    const {
      customerIdx,
      customerName,
      driverIdx,
      driverName,
      productName,
    } = data;
    return (
      <>
        <ManageDeliveryListInnerItemTemplate
          customerIdx={customerIdx}
          customerName={customerName}
          driverIdx={driverIdx}
          driverName={driverName}
          productName={productName}
        />
      </>
    );
  });

  const handleExportExcel = useCallback(async () => {
    try {
      setIsLoading(true);

      const {
        data: { data },
      } = await MemberRepository.getCustomers();
      const { customers } = data;

      const req = await MemberRepository.getDrivers();
      const { drivers } = req.data.data;
      const today = dtil().format('YYYY-MM-DD');
      const excelUserHeader = [
        '고객 고유 번호',
        '아이디',
        '이름',
        '주소',
        '권한',
      ];
      const excelBlank = [''];
      const excelDriverHeader = [
        '기사 고유 번호',
        '아이디',
        '이름',
        '주소',
        '권한',
        '배송중',
      ];
      list.push(excelUserHeader);

      for (const customer of customers) {
        list.push(Object.values(customer));
      }
      list.push(excelBlank);
      list.push(excelDriverHeader);

      for (const driver of drivers) {
        list.push(Object.values(driver));
      }

      const workSheetData = list;
      const workSheet = XLSX.utils.aoa_to_sheet(workSheetData);
      const workBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workBook, workSheet, 'sheet title');
      setIsLoading(false);

      XLSX.writeFile(workBook, `${today}고객 정보.xlsx`);
    } catch (err) {
      setIsLoading(false);

      return err;
    }
  }, [list]);

  const donwloadExcelExample = () => {
    const header = [
      ['customerIdx', 'customerName', 'driverIdx', 'driverName', 'productName'],
    ];
    const workSheetData = header;
    const workSheet = XLSX.utils.aoa_to_sheet(workSheetData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, 'sheet title');
    XLSX.writeFile(workBook, '업로드 예제.xlsx');
  };

  const handleDeliveryCreation = useCallback(async () => {
    try {
      setIsLoading(true);

      let deliveries = [];

      for (let i = 0; i < excelToJSON.length; i += 1) {
        const { customerIdx, driverIdx, productName } = excelToJSON[i];
        if (driverIdx === undefined) {
          const item = {
            customerIdx,
            productName,
          };
          deliveries.push(item);
        } else {
          const item = {
            customerIdx,
            driverIdx,
            productName,
          };
          deliveries.push(item);
        }
      }

      if (deliveries.length <= 0) {
        setIsLoading(false);
        EmptyArray();
        return;
      }

      const res = await ManageDeliveryListRepository.deliveryCreation(
        deliveries
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

      return err;
    }
  }, [excelToJSON]);

  const openModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isLoading && <Loading />}
      <ManageDeliveryList
        onFileInputChage={onFileInputChage}
        onDropFile={onDropFile}
        uploadFileName={uploadFileName || '파일을 드롭하거나 클릭해 주세요.'}
        excelList={excelList}
        handleExportExcel={handleExportExcel}
        handleDeliveryCreation={handleDeliveryCreation}
        donwloadExcelExample={donwloadExcelExample}
        openModal={openModal}
        fileHandler={fileHandler}
      />
      {isOpen && <ManageDeliveryListModalContainer openModal={openModal} />}
    </>
  );
};

export default ManageDeliveryListContainer;
