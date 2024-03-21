import { deleteBook, listBook, returnBook } from '@/services/api/book';
import { convertPageData } from '@/utils/request';
import { openConfirm } from '@/utils/ui';
import { PlusOutlined, DeleteOutlined, LogoutOutlined, LoginOutlined } from '@ant-design/icons';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, message } from 'antd';
import { useRef, useState } from 'react';
import InputDialog1 from './InputDialog1';
import InputDialog2 from './InputDialog2';


export default () => {
  const refAction = useRef<ActionType>(null);
  //声明两个常量，变量名为selectedRowKeys，改变变量值的方法为selectRow
  const [selectedRowKeys, selectRow] = useState<number[]>([]);
  //声明页面级状态变量，将变量传递给对话框，<>内表示是什么类型的数据，()为空表示不对其初始化
  const [book, setBook] = useState<API.BookVO>();
  const [bookLog, setBookLog] = useState<API.BookVO[]>();
  //控制增删改查的打开
  const [visible, setVisible] = useState(false);
  //控制借书框架的打开
  const [lendVisible, setLendVisible] = useState(false);

  const columns: ProColumns<API.BookVO>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 100,
      search: false,
    },
    {
      title: '书名',
      dataIndex: 'name',
      width: 100,
      render: (dom, record) => {
        return (
          <a
            onClick={() => {
              setBook(record);
              setVisible(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: 'ISBN',
      dataIndex: 'isbn',
      width: 100,
    },
    {
      title: '分类号',
      dataIndex: 'category',
      width: 100,
    },
    {
      title: '类型',
      dataIndex: 'classification',
      width: 100,
    },
    {
      title: '作者',
      dataIndex: 'author',
      width: 100,
    },
    {
      title: '出版社',
      dataIndex: 'publisher',
      width: 100,
    },
    {
      title: '价格',
      dataIndex: 'price',
      width: 100,
      search: false,
    },
    {
      title: '出版时间',
      dataIndex: 'publishedTime',
      width: 100,
      search: false,
    },
    {
      title: '购买时间',
      dataIndex: 'boughtTime',
      width: 100,
      search: false,
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
    },
  ];

  //定义一个Delete的回调函数
  const handleDelete = async () => {
    if (!selectedRowKeys?.length) return;
    openConfirm(`您确定移除${selectedRowKeys.length}本书籍吗`, async () => {
      await deleteBook(selectedRowKeys);
      selectRow([]);
      refAction.current?.reload();
      message.success(`删除成功`);
    });
  };


  //定义一个一次还多本书的的回调函数
  const returnBooks = async (bookLog: any) => {
    let sum = 0;
    for (let i = 0; i < bookLog.length; i++) {
      if(bookLog[i].status ==="借出"){
        await returnBook(bookLog[i]);
      }
      else{
        sum = sum+1;
      }
    }
    if(sum!==0){
      message.error(`共${sum}本书归还失败,${bookLog.length-sum}本书归还成功`);
    }else{
      message.success(`归还成功`);
    }
    selectRow([]);
  }

  //定义一个还书的回调函数
  const handleReturn = async (bookLog: any) => {
    if (!selectedRowKeys?.length) return;
    openConfirm(`您确定归还${selectedRowKeys.length}本书吗`, async () => {
      // 注意此处要加await，否则前面还书会出问题
      await returnBooks(bookLog);
      refAction.current?.reload();
    });
  };


  return (
    <PageContainer>

      <ProTable<API.BookVO>
        actionRef={refAction}
        rowKey="id"
        //params为分页信息，protable自动将params传递给listBook，
        //数据由convertPageData转换为antd protable的数据格式
        request={async (params = {}) => {
          return convertPageData(await listBook(params));
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setLendVisible(true);
            }}
            disabled={!selectedRowKeys?.length}
          >
            <LogoutOutlined /> 借出
          </Button>,

          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleReturn(bookLog);
            }}
            disabled={!selectedRowKeys?.length}
          >
            <LoginOutlined />  还书
          </Button>,

          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setBook(undefined);
              setVisible(true);
            }}
          >
            <PlusOutlined /> 新增
          </Button>,

          <Button
            type="primary"
            key="primary"
            danger
            onClick={handleDelete}
            disabled={!selectedRowKeys?.length}
          >
            <DeleteOutlined /> 删除
          </Button>,
        ]}


        columns={columns}
        rowSelection={{
          onChange: (rowKeys, records) => {
            console.log("records");
            console.log(records);
            setBookLog(records);
            selectRow(rowKeys as number[]);
          },
        }}
      />

      <InputDialog1
        detailData={book}
        onClose={(result) => {
          setVisible(false);
          result && refAction.current?.reload();
        }}
        visible={visible}
      />
      <InputDialog2
        detailData={bookLog}
        onClose={(result) => {
          setLendVisible(false);
          result && refAction.current?.reload();
          if (result == true) {
            selectRow([]);
          }
        }}
        visible={lendVisible}
      />

    </PageContainer>
  );
};



