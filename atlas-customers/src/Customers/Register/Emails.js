import React, { useEffect, useState } from 'react';
import {
  Table,
  Button,
  Tooltip,
  Form,
  Modal,
  Input,
  Row,
  Col,
  Select,
  Popconfirm,
  message
} from 'antd';
import {
  DeleteOutlined,
  MailOutlined,
  LoadingOutlined,
  ArrowRightOutlined,
  EditOutlined
} from '@ant-design/icons';
import { ROW_GUTTER } from 'constants/ThemeConstant';
import { useSelector, useDispatch } from 'react-redux';
import { setEmail, removeEmail, setEditEmail } from 'redux/actions';
import * as Enum from 'utils/enums';
import { setLocale } from 'utils/setLocale';

const { Column } = Table;
const { Option } = Select;

const AddNewEmailForm = ({
  visible,
  onCreate,
  onCancel,
  isEdit,
  editEmail
}) => {
  const dispatch = useDispatch();
  const emails = useSelector(({ person }) => person.emails);
  const [form] = Form.useForm();

  useEffect(() => {
    if (isEdit) {
      form.setFieldsValue({
        ...editEmail
      });
    } else {
      form.resetFields();
    }
  }, [editEmail, isEdit]);

  return (
    <Modal
      title="Novo E-mail"
      visible={visible}
      okText="Salvar"
      cancelText="Cancelar"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            if (isEdit) {
              dispatch(setEditEmail({ ...values }));
            } else {
              form.resetFields();
              dispatch(
                setEmail({ key: `email-${emails.length + 1}`, ...values })
              );
            }
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form form={form} name="addEmailForm" layout="vertical">
        {isEdit && (
          <Row gutter={ROW_GUTTER}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item label="Key" name="key">
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>
        )}
        <Row gutter={ROW_GUTTER}>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label="E-mail"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Insira o e-mail!'
                }
              ]}
            >
              <Input
                suffix={false ? <LoadingOutlined /> : <MailOutlined />}
                placeholder="E-mail"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label="Tipo"
              name="type"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Selecione o tipo de e-mail!'
                }
              ]}
            >
              <Select>
                <Option value={0}>...</Option>
                <Option value={1}>Comercial</Option>
                <Option value={2}>Pessoal</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default function Emails(props) {
  const { history } = props;
  const dispatch = useDispatch();
  const emails = useSelector(({ person }) => person.emails);
  const [listEmail, setListEmail] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editEmail, setEditEmail] = useState(null);

  useEffect(() => {
    if (emails) {
      setListEmail([...emails]);
    }
  }, [emails]);

  const showModal = (edit, elm) => {
    setIsEdit(edit);
    setModalVisible(true);
    if (edit) {
      setEditEmail(elm);
    } else {
      setEditEmail(null);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const addEmail = values => {
    const { email, type } = values;
    setModalVisible(false);
    setListEmail({
      key: `email-${listEmail.length + 1}`,
      email,
      type
    });
  };

  const fnRemoveEmail = (text, record) => {
    const newEmail = [...listEmail];
    const remove = newEmail.filter(item => item.key !== record.key);
    setListEmail(remove);
    dispatch(removeEmail(remove));
  };

  const locale = {
    emptyText: (
      <div className="text-center my-4">
        <MailOutlined style={{ fontSize: 70 }} />
        <h3 className="mt-3 font-weight-light">
          {setLocale(true, 'no.email')}
        </h3>
        <div className="mt-3">
          <Button onClick={() => showModal(false)}>
            <MailOutlined /> {setLocale(true, 'add.email')}
          </Button>
        </div>
      </div>
    )
  };

  const confirm = ({ elm }) => {
    fnRemoveEmail(elm.text, elm.record);
    message.success('Produto removido.');
  };

  const cancel = e => {
    message.error('Remoção cancelada.');
  };

  const RemovePopconfirm = elm => {
    return (
      <Popconfirm
        title="Tem certeza que deseja remover?"
        onConfirm={() => confirm({ ...elm })}
        onCancel={cancel}
        okText="Sim"
        cancelText="Não"
        placement="left"
      >
        <Tooltip title="Remover E-mail">
          <Button type="link" shape="circle" icon={<DeleteOutlined />} />
        </Tooltip>
      </Popconfirm>
    );
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>{setLocale(true, 'title.page.list.emails')}</h2>
        <div>
          {listEmail.length !== 0 && (
            <Button onClick={() => showModal(false)}>
              <MailOutlined /> {setLocale(true, 'add.email')}
            </Button>
          )}
          <Button
            type="primary"
            onClick={() => history.push('/app/clients/contacts/create')}
            className="ml-3"
          >
            {setLocale(true, 'continue')} <ArrowRightOutlined />
          </Button>
        </div>
      </div>
      <Table locale={locale} dataSource={listEmail} pagination={false}>
        {listEmail.length && (
          <>
            <Column title="E-Mail" dataIndex="email" key="email" />
            <Column
              title="Tipo"
              dataIndex="type"
              key="type"
              render={type => Enum.typeEmail[type]}
            />
            <Column
              title=""
              key="actions"
              className="text-right"
              render={(text, record) => (
                <>
                  <Tooltip title="Editar E-mail" placement="left">
                    <Button
                      type="link"
                      shape="circle"
                      icon={<EditOutlined />}
                      className="mr-2"
                      onClick={() => showModal(true, record)}
                    />
                  </Tooltip>
                  <RemovePopconfirm elm={{ text, record }} />
                </>
              )}
            />
          </>
        )}
      </Table>

      <AddNewEmailForm
        visible={modalVisible}
        onCreate={addEmail}
        onCancel={closeModal}
        isEdit={isEdit}
        editEmail={editEmail}
      />
    </>
  );
}
