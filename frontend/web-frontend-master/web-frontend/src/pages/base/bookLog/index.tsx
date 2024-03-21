import { listBookLog } from '@/services/api/bookLog';
import { convertPageData,orderBy } from '@/utils/request';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { useRef } from 'react';

export default () => {
  const refAction = useRef<ActionType>(null);
  
  const columns: ProColumns<API.BookLogVO>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: true,
      width: 50,
      search: false,
    },
    {
      title: '书籍ID',
      dataIndex: 'bookId',
      fixed: true,
      width: 50,
      search: false,
    },
    {
      title: '书名',
      dataIndex: 'bookName',
      width: 100,
    },
    {
      title: '借阅人',
      dataIndex: 'readerName',
      fixed: true,
      width: 100,
    },
    {
      title: 'ISBN',
      dataIndex: 'bookIsbn',
      width: 100,
      search: false,
    },
    {
      title: '借阅日期',
      width: 100,
      sorter: true,
      dataIndex: 'borrowedTime',
      valueType: 'date',
      search: false,
    },
    {
      title: '还书日期',
      dataIndex: 'returnTime',
      sorter: true,
      key: 'returnTime',
      valueType: 'date',
      width: 100,
      search: false,
    },
  ];


  return (
    <PageContainer>
      <ProTable<API.BookLogVO>
        actionRef={refAction}
        rowKey="id"
        pagination={{
          defaultPageSize: 10,
        }}
        search={{
          labelWidth: 120,
        }}
        scroll={{ x: 100 }}
        request={async (params = {}, sort) => {
          console.log(sort);
          return convertPageData(await listBookLog({ ...params, orderBy: orderBy(sort) }));
        }}
        columns={columns}
      />
    </PageContainer>
  );
};



