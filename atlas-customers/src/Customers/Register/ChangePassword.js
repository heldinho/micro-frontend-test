/* eslint-disable no-alert */
import React from 'react';
import { Form, Button, Input, Row, Col, message, Switch, List } from 'antd';
import { ROW_GUTTER } from 'constants/ThemeConstant';
import { LockOutlined, ArrowRightOutlined } from '@ant-design/icons';
import Icon from 'components/util-components/Icon';
import Flex from 'components/shared-components/Flex';
import { useSelector, useDispatch } from 'react-redux';
import { setSecurity } from 'redux/actions/Person';

export default function ChangePassword(props) {
  const dispatch = useDispatch();
  const security = useSelector(({ person }) => person.security);

  const changePasswordFormRef = React.createRef();

  const [twoFactors, setTwoFactors] = React.useState(false);
  const [config, setConfig] = React.useState([
    {
      key: 'key-two-factor',
      title: 'Login dois fatores',
      icon: LockOutlined,
      desc: 'Ative uma seguraça a mais no seu usuário na hora do login.',
      allow: twoFactors
    }
  ]);

  React.useEffect(() => {
    setTwoFactors(security.twoFactors);
  }, [security]);

  const onFinish = val => {
    dispatch(
      setSecurity({
        newPassword: val.newPassword,
        confirmPassword: val.newPassword,
        twoFactors
      })
    );
    setTimeout(() => {
      props.history.push('/app/clients/emails/create');
    }, 2000);
    message.success({ content: 'Password Changed!', duration: 2 });
    // onReset();
  };

  const onReset = () => {
    changePasswordFormRef.current.resetFields();
  };

  return (
    <>
      <Form
        name="changePasswordForm"
        layout="vertical"
        ref={changePasswordFormRef}
        onFinish={onFinish}
      >
        <Row gutter={ROW_GUTTER}>
          <Col xs={24} sm={24} md={24}>
            <Form.Item
              label="Nova Senha"
              name="newPassword"
              rules={[
                {
                  required: true,
                  message: 'Digite a nova senha!'
                }
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24}>
            <Form.Item
              label="Confirmar Senha"
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: 'Confirme a nova senha!'
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject('Senha não é igual!');
                  }
                })
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24}>
            <List
              itemLayout="horizontal"
              dataSource={config}
              renderItem={item => (
                <List.Item>
                  <Flex
                    justifyContent="between"
                    alignItems="center"
                    className="w-100"
                  >
                    <div className="d-flex align-items-center">
                      <Icon className="h1 mb-0 text-primary" type={item.icon} />
                      <div className="ml-3">
                        <h4 className="mb-0">{item.title}</h4>
                        <p>{item.desc}</p>
                      </div>
                    </div>
                    <div className="ml-3">
                      <Switch
                        defaultChecked={item.allow}
                        checked={twoFactors}
                        onChange={checked => {
                          const checkedItem = config.map(elm => {
                            if (elm.key === item.key) {
                              elm.allow = checked;
                            }
                            return elm;
                          });
                          setTwoFactors(checkedItem[0].allow);
                          setConfig([...checkedItem]);
                        }}
                      />
                    </div>
                  </Flex>
                </List.Item>
              )}
            />
          </Col>
          <Col xs={24} sm={24} md={24}>
            <div className="d-flex justify-content-end align-items-center mt-3">
              <Button type="primary" htmlType="submit">
                Continuar <ArrowRightOutlined />
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </>
  );
}
