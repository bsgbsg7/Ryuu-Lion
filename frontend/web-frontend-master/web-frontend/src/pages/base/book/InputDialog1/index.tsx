import { ModalForm, ProForm, ProFormInstance, ProFormSelect, ProFormText, ProFormDatePicker } from '@ant-design/pro-components';
import { message, Switch, Tooltip } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { waitTime } from '@/utils/request';
import { addBook, updateBook } from '@/services/api/book';
import moment from 'dayjs';

interface InputDialogProps {
  detailData?: API.BookDTO;
  visible: boolean;
  onClose: (result: boolean) => void;
}

export default function InputDialog(props: InputDialogProps) {
  const form = useRef<ProFormInstance>(null);

  useEffect(() => {
    waitTime().then(() => {
      if (props.detailData) {
        form?.current?.setFieldsValue(props.detailData);
      } else {
        form?.current?.resetFields();
      }
    });
  }, [props.detailData, props.visible]);

  const onFinish = async (values: any) => {
    const { name, isbn, author, publisher, price, category, boughtTime, publishedTime, status, classification, } = values;
    const data: API.BookDTO = {
      id: props.detailData?.id,
      name,
      isbn,
      author,
      publisher,
      price,
      category,
      boughtTime,
      publishedTime,
      status,
      classification
    };

    if (props.detailData) {
      await updateBook(data);
    } else {
      await addBook(data);
    }
    message.success('保存成功');
    props.onClose(true);
    return true;
  };


  return (
    //返回一个模态对话框
    <ModalForm
      width={600}
      onFinish={onFinish}
      formRef={form}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => props.onClose(false),
      }}
      title={props.detailData ? '修改书籍' : '新增书籍'}
      open={props.visible}
    >

      <ProForm.Group>
        <ProFormText
          name="category"
          label="category"
          hidden
        />
        <ProFormText
          name="boughtTime"
          label="boughtTime"
          hidden
        />
        <ProFormText
          name="publishedTime"
          label="publishedTime"
          hidden
        />
        <ProFormText
          name="classification"
          label="classification"
          hidden
        />
        <ProFormText
          name="name"
          label="书籍名称"
          rules={[
            {
              required: true,
              message: '请输入书籍名称！',
            },
          ]}
        />

        <ProFormText
          name="isbn"
          label="ISBN"
          tooltip="输入必须为13位"
          rules={[
            {
              required: true,
              message: '请输入ISBN号！',
            },
            {
              // 此处设为false可以解决填写后退格导致两种报错的问题
              required: false,
              message: 'ISBN格式不符合要求！',
              max: 13,
              min: 13
            },
          ]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          name="publisher"
          label="出版社"
          rules={[
            {
              required: true,
              message: '请输入出版社名称！',
            },
          ]}
        />
        <ProFormText
          name="author"
          label="作者"
          rules={[
            {
              required: true,
              message: '请输入作者名称！',
            },
          ]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          name="price"
          label="书籍价格"
          width={130}
        />
        <ProFormText
          name="category"
          label="分类号"
          width={130}
        />
        <ProFormText
          name="classification"
          label="分类"
          width={130}
        />
      </ProForm.Group>

      <ProForm.Group>
        <ProFormDatePicker
          name="boughtTime"
          label="购买时间"
          initialValue={moment()}
        />
        <ProFormDatePicker
          name="publishedTime"
          label="出版时间"
          initialValue={moment()}
        />
        <ProFormSelect
          name="status"
          label="状态"
          options={[
            { label: '在架', value: '在架' },
            { label: '借出', value: '借出' },
          ]}
        />
      </ProForm.Group>
    </ModalForm >
  );
}








