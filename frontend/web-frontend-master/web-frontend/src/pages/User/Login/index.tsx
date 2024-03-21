import Footer from '@/components/Footer';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginFormPage, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { FormattedMessage, history, SelectLang, useIntl, useModel, Helmet } from '@umijs/max';
import { Divider, message } from 'antd';
import Settings from '../../../../config/defaultSettings';
import React, { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { login } from '@/services/api/authentication';

const Lang = () => {
  const langClassName = useEmotionCss(({ token }) => {
    return {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    };
  });

  return (
    <div className={langClassName} data-lang>
      {SelectLang && <SelectLang />}
    </div>
  );
};

const Login: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [poem, setPoem] = useState('');
  const [info, setInfo] = useState('');
  useEffect(() => {
    async function fetchJinrishici() {
      const jinrishici = require('jinrishici');
      await jinrishici.load(result => {
        console.log("诗词内容");
        console.log(result.data.content);
        setPoem(result.data.content);
        console.log("使用setPoem之后,poem变量");
        console.log(poem);
        setInfo("——" + result.data.origin.author + "《" + result.data.origin.title + "》");
      });

    }

    fetchJinrishici();
  }, []);

  useEffect(() => {
    if (document.getElementById("poem")) {
      console.log("1123")
      document.getElementById("poem").innerHTML = poem;
    }
    if (document.getElementById("info")) {
      document.getElementById("info").innerHTML = info;
    }
  }, [poem, info]);

  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '120vh',
      overflow: 'auto',
      // backgroundImage:
      //   "url('image.jpg')",
      backgroundSize: '100% 100%',
    };
  });

  const intl = useIntl();

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentToken: userInfo,
        }));
      });
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      // 登录
      const msg = await login({ userId: values.username!, password: values.password! });
      if (!msg) return;

      const defaultLoginSuccessMessage = intl.formatMessage({
        id: 'pages.login.success',
        defaultMessage: '登录成功！',
      });
      message.success(defaultLoginSuccessMessage);
      await fetchUserInfo();
      const urlParams = new URL(window.location.href).searchParams;
      history.push(urlParams.get('redirect') || '/');
      return;
    } catch (error: any) {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: '登录失败，请重试！',
      });
      message.error(error?.message || defaultLoginFailureMessage);
    }
  };


  return (

    <div className={containerClassName} style={{ overflowX: 'hidden', overflowY: 'hidden' }}>
      <Helmet>
        <title>
          {intl.formatMessage({
            id: 'menu.login',
            defaultMessage: '登录页',
          })}
          - {Settings.title}
        </title>
      </Helmet>
      <Lang />

      <div style={{ overflowX: 'hidden', overflowY: 'hidden', backgroundColor: 'white', height: 'calc(110vh - 48px)', margin: 0 }}>
        <LoginFormPage
          logo={<img alt="logo" src="/logo.jpg" />}
          title="个人图书管理"
          // // subTitle={subTitle}
          actions={
            <div
              style={{ textAlign: "center" }}
            >
              <p>
                —— Designed by <a href="https://gitee.com/bsgbsg7" >Bsgbsg7</a>
              </p>
            </div>
          }
          backgroundImageUrl="https://t.mwm.moe/pc"
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values);
          }}
        >

          <Divider dashed>
            <span style={{ color: '#AAA', fontWeight: 'normal', fontSize: 14 }}>
              念两句诗
            </span>
          </Divider>

          <div >
            <div style={{ fontSize: 25, float: 'left', lineHeight: 0, wordBreak: 'normal', margin: 0, padding: 0 }} >『</div>
            <div id='poem' style={{ fontSize: 18, textAlign: 'center', lineHeight: 2, wordBreak: 'normal', margin: 0, padding: 10 }}></div>
            <div style={{ fontSize: 25, float: 'right', lineHeight: 0, wordBreak: 'normal', margin: 0, padding: 0 }}>』</div>
            <div id='info' style={{ fontSize: 15, textAlign: 'right', lineHeight: 5, wordBreak: 'normal', margin: 0, padding: 0 }}></div>
          </div>


          <ProFormText
            name="username"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined />,
            }}
            placeholder={intl.formatMessage({
              id: 'pages.login.username.placeholder',
              defaultMessage: '用户名: admin or user',
            })}
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id="pages.login.username.required"
                    defaultMessage="请输入用户名!"
                  />
                ),
              },
            ]}
          />

          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined />,
            }}
            placeholder={intl.formatMessage({
              id: 'pages.login.password.placeholder',
              defaultMessage: '密码: ant.design',
            })}
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id="pages.login.password.required"
                    defaultMessage="请输入密码！"
                  />
                ),
              },
            ]}
          />

          <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              <FormattedMessage id="pages.login.rememberMe" defaultMessage="自动登录" />
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
            >
              <FormattedMessage id="pages.login.forgotPassword" defaultMessage="忘记密码" />
            </a>
          </div>
        </LoginFormPage>

      </div>
      <Footer />
    </div>

  );
};

export default Login;
