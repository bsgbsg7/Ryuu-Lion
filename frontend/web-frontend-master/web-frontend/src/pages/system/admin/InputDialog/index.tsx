/**
 * 名称：管理员对话框
 * 作者：李洪文
 * 单位：山东大学
 * 上次修改：2023-3-3
 */
import { getAdmin, addAdmin, updateAdmin } from '@/services/api/admin';
import {
  ProForm,
  ProFormInstance,
  ProFormSelect,
  ProFormText,
  StepsForm,
} from '@ant-design/pro-components';
import { Button, Form, message, Modal } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';
import PrivTable, { PrivTableRef } from './PrivTable';
import { waitTime } from '@/utils/request';

interface InputDialogProps {
  visible: boolean;
  id?: number;
  onClose: (result: boolean) => void;
}

export default function InputDialog(props: InputDialogProps) {
  const formMapRef = useRef<React.MutableRefObject<ProFormInstance<any> | undefined>[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const refPrivTable = useRef<PrivTableRef>(null);
  const [disablePrivSelect, setDisableSelect] = useState(false);
  const initData = useCallback(async (id?: number) => {
    if (id) {
      const result = await getAdmin({ id });
      if (result) {
        formMapRef?.current?.forEach((formInstanceRef) => {
          formInstanceRef?.current?.setFieldsValue({
            ...result,
            sex: !result.sex ? '0' : '1',
            enabled: `${result.enabled}`,
          });
        });
        setDisableSelect(result.userCode === 'root');
      }
    } else {
      setDisableSelect(false);
      await waitTime();
      // 编辑场景下需要使用formMapRef循环设置formData
      formMapRef?.current?.forEach((formInstanceRef) => {
        formInstanceRef?.current?.setFieldsValue({ sex: '1', enabled: 'true' });
      });
    }
  }, []);
  useEffect(() => {
    setCurrentStep(0);
    initData(props.id);
  }, [props.id, props.visible]);

  const onSubmit = async (values: any) => {
    console.log(values);
    if (props.id) {
      await updateAdmin({ ...values, id: props.id });
    } else {
      await addAdmin(values);
    }
    message.success('保存成功');
    props.onClose(true);
    return true;
  };

  return (
    <StepsForm
      formMapRef={formMapRef}
      current={currentStep}
      onCurrentChange={setCurrentStep}
      stepsProps={{
        size: 'small',
      }}
      stepsFormRender={(dom, submitter) => {
        return (
          <Modal
            width={800}
            bodyStyle={{ padding: '32px 40px 48px' }}
            destroyOnClose
            title={props.id ? '修改操作员' : '新建操作员'}
            open={props.visible}
            footer={submitter}
            onCancel={() => {
              props.onClose(false);
            }}
          >
            {dom}
          </Modal>
        );
      }}
      submitter={{
        render: (props) => {
          if (props.step === 0) {
            return (
              <Button type="primary" onClick={() => props.onSubmit?.()}>
                下一步
              </Button>
            );
          }

          return [
            <Button key="gotoOne" onClick={() => props.onPre?.()}>
              上一步
            </Button>,
            <Button key="selectAll" onClick={() => refPrivTable.current?.selectAll()}>
              全选
            </Button>,
            <Button key="clearSel" onClick={() => refPrivTable.current?.clearSelections()}>
              清除全选
            </Button>,
            <Button key="submit" type="primary" onClick={() => props.onSubmit?.()}>
              提交
            </Button>,
          ];
        },
      }}
      onFinish={onSubmit}
    >
      <StepsForm.StepForm title="基本信息">
        <ProForm.Group>
          <ProFormText
            name="userCode"
            label="登录名称"
            disabled={!!props.id}
            rules={[
              {
                required: true,
                message: '请输入登录名称！',
              },
            ]}
          />
          <ProFormText
            name="name"
            label="姓名"
            rules={[
              {
                required: true,
                message: '请输入姓名！',
              },
            ]}
          />
          <ProFormSelect<number>
            name="sex"
            width="xs"
            label="性别"
            valueEnum={{
              0: '女',
              1: '男',
            }}
          />
          <ProFormText.Password
            name="password"
            placeholder={props.id ? '为空则不修改密码' : '请输入密码'}
            fieldProps={{ defaultValue: '', autoComplete: 'new-password' }}
            label="密码"
            rules={[
              {
                required: !props.id,
                message: '请输入密码！',
              },
            ]}
          />
          <ProFormText name="department" label="部门" />
          <ProFormText name="email" label="电子邮箱" />
          <ProFormText name="phone" label="手机号" />
          <ProFormSelect
            name="enabled"
            width="xs"
            label="状态"
            valueEnum={{
              false: '禁用',
              true: '启用',
            }}
          />
        </ProForm.Group>
      </StepsForm.StepForm>
      <StepsForm.StepForm title="权限">
        <Form.Item name="modList">
          <PrivTable ref={refPrivTable} disabled={disablePrivSelect} />
        </Form.Item>
      </StepsForm.StepForm>
    </StepsForm>
  );
}
