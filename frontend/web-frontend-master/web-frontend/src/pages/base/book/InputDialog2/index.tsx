import { ModalForm, ProForm, ProFormInstance, ProFormText, ProFormDatePicker, ProTable } from '@ant-design/pro-components';
import { message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { waitTime } from '@/utils/request';
import { lendBooks } from '@/services/api/book';
import moment from 'dayjs';
import React from 'react';

interface InputDialogProps {
  detailData?: API.BookDTO[];
  visible: boolean;
  onClose: (result: boolean) => void;
}

export default function InputDialog(props: InputDialogProps) {
  const form = useRef<ProFormInstance>(null);

  const [formData, setFormData] = useState<API.BookDTO[]>([]);
  console.log("formData")
  console.log(formData)

  useEffect(() => {
    waitTime().then(() => {
      if (props.detailData) {
        form?.current?.setFieldsValue(props.detailData);
        setFormData(props.detailData);
      } else {
        form?.current?.resetFields();
      }
    });
  }, [props.detailData, props.visible]);


  const onFinish = async (values: any) => {
    const { readerName, borrowedTime, returnTime } = values;
    const bookDTOArray: API.BookDTO[] = [];
    const bookLogDTOArray: API.BookLogDTO[] = [];
    /**
     * 使用forEach()方法遍历formData数组，将每个元素转换为一个包含书籍信息的DTO对象（bookDTO），
     * 并将其添加到bookDTOArray数组中。
     * 还将每个元素的借阅日志信息转换为一个包含借阅日志的DTO对象（bookLogDTO），
     * 并将其添加到bookLogDTOArray数组中。
     */
    formData.forEach((item) => {
      //将一个包含书籍信息的DTO对象添加到bookDTOArray数组
      bookDTOArray.push({
        id: item.id,
        name: item.name,
        isbn: item.isbn,
        author: item.author,
        publisher: item.publisher,
        price: item.price,
        category: item.category,
        boughtTime: item.boughtTime,
        publishedTime: item.publishedTime,
        status: item.status,
        classification: item.classification
      });

      bookLogDTOArray.push({
        readerName,
        bookId: item.id,
        bookName: item.name,
        bookIsbn: item.isbn,
        borrowedTime: borrowedTime,
        returnTime: returnTime || null
      });
    });

    /**
     * bookDTOArray和bookLogDTOArray数组中的元素一一对应，
     * 可以通过它们的索引值将它们组合成一个新的DTO对象（bookAndLogDTO）并返回给后端。
     */
    const data: API.BookAndLogDTO[] = bookDTOArray.map((item, index) => ({
      bookDTO: item,
      bookLogDTO: bookLogDTOArray[index]
    }));

    console.log("data")
    console.log(data)

    if (props.detailData) {
      let sum = 0;
      for (let i = 0; i < data.length; i++) {
        if(data[i].bookDTO?.status==="在架"){
          await lendBooks(data[i]);
        }
        else{
          sum = sum+1;
        }
      }
      if(sum!==0){
        message.error(`共${sum}本书借出失败,${data.length-sum}本书借出成功`);
      }else{
        message.success(`借出成功`);
      }
    } else {
    }
    props.onClose(true);
    return true;
  };

  return (
    <ModalForm
      width={700}
      onFinish={onFinish}
      formRef={form}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => props.onClose(false),
      }}
      title={props.detailData ? '借出' : '借出'}
      open={props.visible}
    >
      <ProForm.Group >
        <ProFormText
          name={`readerName`}
          label="借阅人"
          rules={[
            {
              required: true,
              message: '请输入借阅人姓名！',
            },
          ]}
        />
        <ProFormDatePicker
          name={`borrowedTime`}
          label="借出日期"
          initialValue={moment()}
        />
      </ProForm.Group>

      <ProTable
        dataSource={formData}
        columns={[
          { title: '书名', dataIndex: 'name' },
          { title: '出版社', dataIndex: 'publisher' },
          { title: '作者', dataIndex: 'author' },
          { title: 'ISBN', dataIndex: 'isbn' },
        ]}
        options={false}
        search={false}
        cardBordered={false}
      />
    </ModalForm>
  );

}








