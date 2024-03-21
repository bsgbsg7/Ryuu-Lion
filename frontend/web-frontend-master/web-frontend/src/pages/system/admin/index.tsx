/**
 * 名称：管理员维护模块
 * 作者：李洪文
 * 单位：山东大学
 * 上次修改：2023-3-3
 */
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, Input, message, Space } from 'antd';
import React, { useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { listAdmin, deleteAdmin } from '@/services/api/admin';
import { convertPageData } from '@/utils/request';
import InputDialog from './InputDialog';
import { openConfirm } from '@/utils/ui';

export default () => {
  const [visible, setVisible] = useState(false);
  const refAction = useRef<ActionType>(null);
  const [id, setId] = useState<number | undefined>();
  const [selectedRowKeys, selectRow] = useState<number[]>([]);
  const handleDelete = (userCodes: number[]) => {
    if (!userCodes || userCodes.length === 0) {
      return;
    }

    openConfirm(`您确定要删除选定的${userCodes.length}个用户吗？`, async () => {
      const result = await deleteAdmin(userCodes);
      message.success(`成功的删除了${result}条记录！`);
      refAction.current?.clearSelected!();
      refAction.current?.reload();
    });
  };
  const columns: ProColumns<API.AdminVO>[] = [
    {
      title: '用户ID',
      dataIndex: 'userCode',
      fixed: true,
      width: 100,
      search: false,
      tip: '用户ID唯一',
      render: (dom, record) => {
        return (
          <a
            onClick={() => {
              setId(record.id);
              setVisible(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: '关键词',
      key: 'keyword',
      hideInTable: true,
      renderFormItem: (_: any, { type }) => {
        if (type === 'form') {
          return null;
        }
        return <Input allowClear />;
      },
    },
    {
      title: '姓名',
      search: false,
      dataIndex: 'name',
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
      title: '电话',
      search: false,
      dataIndex: 'phone',
      width: 100,
    },
    {
      title: '电子邮件',
      dataIndex: 'email',
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
      title: '创建人',
      dataIndex: 'createdByDesc',
      search: false,
      width: 100,
    },
    {
      title: '上次更新',
      width: 150,
      search: false,
      sorter: true,
      dataIndex: 'updatedAt',
      valueType: 'dateTime',
    },
    {
      title: '操作',
      width: 100,
      fixed: 'right',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="modify"
          onClick={() => {
            setId(record.id);
            setVisible(true);
          }}
        >
          修改
        </a>,
        <a
          key="delete"
          onClick={() => {
            handleDelete([record.id!]);
          }}
        >
          删除
        </a>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.AdminVO>
        actionRef={refAction}
        rowKey="id"
        scroll={{ x: 100 }}
        search={{
          labelWidth: 120,
        }}
        request={async (params = {}) => {
          return convertPageData(await listAdmin(params));
        }}
        tableAlertOptionRender={() => {
          return (
            <Space size={16}>
              <a onClick={() => handleDelete(selectedRowKeys)}>批量删除</a>
              <a onClick={() => refAction.current?.clearSelected!()}>取消选择</a>
            </Space>
          );
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setId(undefined);
              setVisible(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        columns={columns}
        rowSelection={{
          onChange: (rowKeys) => {
            selectRow(rowKeys as number[]);
          },
        }}
      />
      <InputDialog
        visible={visible}
        onClose={(result) => {
          if (result) {
            refAction.current?.reload();
          }
          setVisible(false);
          setId(undefined);
        }}
        id={id}
      />
    </PageContainer>
  );
};
