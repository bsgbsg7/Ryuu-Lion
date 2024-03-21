/**
 * 名称：管理员对话框中的权限列表
 * 作者：李洪文
 * 单位：山东大学
 * 上次修改：2023-3-3
 */
import { Checkbox, CheckboxOptionType, Form, Input, Table } from 'antd';
import WindowsFilled from '@ant-design/icons/WindowsFilled';
import React, { useCallback, useEffect, useImperativeHandle, useState } from 'react';
import routes from '../../../../../config/routes';
import { useIntl, useModel } from '@umijs/max';
import { listModules } from '@/services/api/admin';
interface MenuModel {
  resourceKey: string;
  description: string;
  folder: string;
}
interface PrivTableProps {
  disabled: boolean;
  value?: API.AdminModDTO[];
  onChange?: (value: API.AdminModDTO[]) => void;
}

export interface PrivTableRef {
  selectAll: () => void;
  clearSelections: () => void;
}

export default React.forwardRef<PrivTableRef, PrivTableProps>((props: PrivTableProps, ref) => {
  const intl = useIntl();
  const [menuList, setMenuList] = useState<MenuModel[]>([]);
  const [allModList, setAllModList] = useState<API.ModuleVO[]>([]);
  const selectAll = useCallback(() => {
    const list: API.AdminModDTO[] = [];
    allModList.forEach((item) => {
      const privList: string[] = [];
      item.privilegeList!.forEach((priv) => privList.push(priv.id!));

      list.push({
        id: item.id,
        privList,
      });
    });
    props.onChange && props.onChange(list);
  }, [allModList]);

  const clearSelections = useCallback(() => {
    props.onChange && props.onChange([]);
  }, []);

  const clearModPrivs = (modId: string) => {
    const privs = props.value?.filter((o) => o.id !== modId) || [];
    props.onChange && props.onChange(privs);
  };
  const selectAllModPrivs = (modId: string) => {
    const privs = props.value?.filter((o) => o.id !== modId) || [];
    const mod = allModList.find((item) => item.id === modId);
    if (!mod) return;
    const vals: string[] = [];
    mod.privilegeList!.forEach((item) => vals.push(item.id!));
    privs.push({ id: modId, privList: vals });
    props.onChange && props.onChange(privs);
  };

  useImperativeHandle(ref, () => ({
    // 暴露给父组件的方法
    selectAll,
    clearSelections,
  }));

  useEffect(() => {
    listModules().then((result) => setAllModList(result || []));
    const menuList: MenuModel[] = [];
    routes.forEach((item) => {
      if (!item.name || item.name === 'welcome') return;
      if (!item.routes || item.routes.length == 0) {
        return;
      }
      item.routes.forEach((mod) => {
        if (!mod.name || mod.hideInMenu) return;
        menuList.push({
          resourceKey: mod.name,
          description: intl.formatMessage({ id: `menu.${item.name}.${mod.name}` }),
          folder: intl.formatMessage({ id: `menu.${item.name}` }),
        });
      });
    });
    setMenuList(menuList);
  }, []);

  const handlePrivChange = (privList: string[], key: string) => {
    const modList = [...(props.value || [])];
    const privMod = modList.find((item) => item.id === key);
    if (privMod) {
      privMod.privList = privList;
    } else {
      modList.push({
        id: key,
        privList: privList,
      });
    }

    props.onChange && props.onChange(modList);
  };

  const columns = [
    {
      title: '菜单目录',
      width: 120,
      dataIndex: 'folder',
      render: (v: string) => (
        <span>
          <WindowsFilled style={{ marginRight: 2, color: 'green' }} />
          {v}
        </span>
      ),
    },
    {
      title: '模块名称',
      width: 120,
      dataIndex: 'description',
      render: (v: string, record: MenuModel) => {
        const mod = allModList.find((item) => item.id === record.resourceKey);
        if (!mod?.privilegeList?.length) {
          return v;
        }
        const privMod = props.value?.find((item) => item.id === record.resourceKey);
        const checked =
          !!mod?.privilegeList?.length && mod?.privilegeList?.length === privMod?.privList?.length;

        return (
          <Checkbox
            onClick={() => {
              checked ? clearModPrivs(record.resourceKey) : selectAllModPrivs(record.resourceKey);
            }}
            checked={checked}
            indeterminate={
              !!privMod?.privList?.length &&
              mod?.privilegeList?.length !== privMod?.privList?.length
            }
          >
            {v}
          </Checkbox>
        );
      },
    },
    {
      title: '权限',
      dataIndex: 'resourceKey',
      render: (key: string) => {
        const mod = allModList.find((item) => item.id === key);
        const options: CheckboxOptionType[] = [];
        if (mod) {
          mod.privilegeList!.forEach((item) =>
            options.push({ label: item.description!, value: item.id! }),
          );
        }
        let privs: string[] = [];
        const privMod = props.value?.find((item) => item.id === key);
        if (privMod) {
          privs = [...privMod.privList!];
        }
        return (
          <Checkbox.Group
            disabled={props.disabled}
            value={privs}
            options={options}
            onChange={(value) => handlePrivChange(value as string[], key)}
          ></Checkbox.Group>
        );
      },
    },
  ];
  return (
    <Table
      size="small"
      scroll={{ y: 300 }}
      rowKey={(item) => `row${item.resourceKey}`}
      columns={columns}
      dataSource={menuList || []}
      pagination={false}
      loading={false}
    />
  );
});
