import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Button, Input, message, Space, Modal } from 'antd';
import React, { useRef, useState } from 'react';
import { listOnlineUser } from '@/services/api/onlineUser';
import { convertPageData } from '@/utils/request';

const Admin: React.FC = () => {
  const intl = useIntl();
  const refAction = useRef<ActionType>(null);
  const columns: ProColumns<API.OnlineUserVO>[] = [
    {
      title: '用户ID',
      dataIndex: 'userCode',
      fixed: true,
      width: 100,
      search: false,
    },
    {
      title: '姓名',
      search: false,
      dataIndex: 'userName',
      width: 100,
    },
    {
      title: '性别',
      dataIndex: 'sex',
      search: false,
      width: 60,
      render: (_: any, record) => {
        return record?.sex ? '男' : '女';
      },
    },
    {
      title: '状态',
      dataIndex: 'enabled',
      search: false,
      width: 60,
      render: (_: any, record) => {
        return record?.enabled ? '启用' : '禁用';
      },
    },
    {
      title: '浏览器',
      search: false,
      dataIndex: 'browser',
      width: 150,
      ellipsis: true,
    },
    {
      title: '操作系统',
      dataIndex: 'os',
      search: false,
      width: 100,
    },
    {
      title: '部门',
      dataIndex: 'department',
      search: false,
      ellipsis: true,
    },
    {
      title: '上次动作',
      width: 150,
      search: false,
      sorter: true,
      dataIndex: 'lastAction',
      valueType: 'dateTime',
    },
    {
      title: '操作',
      width: 100,
      fixed: 'right',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <a key="delete" onClick={() => {}}>
          踢出
        </a>
      ),
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.OnlineUserVO>
        actionRef={refAction}
        rowKey="userCode"
        search={false}
        scroll={{ x: 100 }}
        request={async () => {
          const list = (await listOnlineUser()) || [];
          return {
            data: list,
            total: list.length,
            success: true,
          };
        }}
        columns={columns}
      />
    </PageContainer>
  );
};

export default Admin;
