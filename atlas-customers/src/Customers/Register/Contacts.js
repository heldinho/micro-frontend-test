import React, { useState, useEffect } from 'react';
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
  PhoneOutlined,
  LoadingOutlined,
  ArrowRightOutlined,
  TabletOutlined,
  EditOutlined
} from '@ant-design/icons';
import { ROW_GUTTER } from 'constants/ThemeConstant';
import { useSelector, useDispatch } from 'react-redux';
import { setContact, removeContact, setEditContact } from 'redux/actions';
import * as Enum from 'utils/enums';
import MaskedInput from 'antd-mask-input';
import { setLocale } from 'utils/setLocale';

const { Column } = Table;
const { Option } = Select;

const AddNewContactForm = ({
  visible,
  onCreate,
  onCancel,
  isEdit,
  editContact
}) => {
  const dispatch = useDispatch();
  const phones = useSelector(({ person }) => person.phones);
  const [form] = Form.useForm();
  const [typePhone, setTypePhone] = useState(0);
  const [values, setValues] = useState({
    number: ''
  });

  useEffect(() => {
    if (isEdit) {
      form.setFieldsValue({
        ...editContact
      });
      setTypePhone(editContact.type);
      setValues({
        ...values,
        number: editContact.number
      });
    } else {
      form.resetFields();
      setTypePhone(0);
      setValues({
        ...values,
        number: ''
      });
    }
  }, [editContact, isEdit]);

  const fnSelectType = val => {
    setTypePhone(val);
  };

  const fnChangeNumber = e => {
    const { value: val } = e.target;
    setValues({
      ...values,
      number: val
    });
  };

  return (
    <Modal
      title="Novo Telefone"
      visible={visible}
      okText="Salvar"
      cancelText="Cancelar"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(val => {
            if (isEdit) {
              dispatch(setEditContact({ ...val, ...values }));
            } else {
              dispatch(
                setContact({
                  key: `number-${phones.length + 1}`,
                  ...val,
                  ...values
                })
              );
              form.resetFields();
              setTypePhone(0);
              setValues({
                ...values,
                number: ''
              });
            }
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form form={form} name="addContactForm" layout="vertical">
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
              label="Tipo"
              name="type"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Selecione o tipo do telefone!'
                }
              ]}
            >
              <Select name="type" onChange={fnSelectType}>
                <Option value={0}>...</Option>
                <Option value={1}>Celular</Option>
                <Option value={2}>Comercial</Option>
                <Option value={3}>Residencial</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label={typePhone !== 0 ? 'Número' : ''}
              name="number"
              rules={[
                {
                  required: false,
                  message: 'Insira o número de telefone!'
                }
              ]}
            >
              {typePhone === 1 && (
                <MaskedInput
                  mask="(11) 11111-1111"
                  name="number"
                  onChange={fnChangeNumber}
                  value={values.number}
                  suffix={false ? <LoadingOutlined /> : <TabletOutlined />}
                />
              )}
              {typePhone === 2 && (
                <MaskedInput
                  mask="(11) 1111-1111"
                  name="number"
                  onChange={fnChangeNumber}
                  value={values.number}
                  suffix={false ? <LoadingOutlined /> : <PhoneOutlined />}
                />
              )}
              {typePhone === 3 && (
                <MaskedInput
                  mask="(11) 1111-1111"
                  name="number"
                  onChange={fnChangeNumber}
                  value={values.number}
                  suffix={false ? <LoadingOutlined /> : <PhoneOutlined />}
                />
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default function Contacts(props) {
  const { history } = props;
  const dispatch = useDispatch();
  const phones = useSelector(({ person }) => person.phones);
  const [listContact, setListContact] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editContact, setEditContact] = useState(null);

  useEffect(() => {
    if (phones) {
      setListContact([...phones]);
    }
  }, [phones]);

  const showModal = (edit, elm) => {
    setIsEdit(edit);
    setModalVisible(true);
    if (edit) {
      setEditContact(elm);
    } else {
      setEditContact(null);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const addContact = values => {
    const { number, type } = values;
    setModalVisible(false);
    setListContact({
      key: `number-${listContact.length + 1}`,
      type,
      number
    });
  };

  const fnRemoveContact = (text, record) => {
    const newContact = [...listContact];
    const remove = newContact.filter(item => item.key !== record.key);
    setListContact(remove);
    dispatch(removeContact(remove));
  };

  const locale = {
    emptyText: (
      <div className="text-center my-4">
        <PhoneOutlined style={{ fontSize: 70 }} />
        <h3 className="mt-3 font-weight-light">
          {setLocale(true, 'no.phone')}
        </h3>
        <div className="mt-3">
          <Button onClick={() => showModal(false)}>
            <PhoneOutlined /> {setLocale(true, 'add.phone')}
          </Button>
        </div>
      </div>
    )
  };

  const confirm = ({ elm }) => {
    fnRemoveContact(elm.text, elm.record);
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
        <Tooltip title="Remover Telefone">
          <Button type="link" shape="circle" icon={<DeleteOutlined />} />
        </Tooltip>
      </Popconfirm>
    );
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>{setLocale(true, 'title.page.list.phones')}</h2>
        <div>
          {listContact.length !== 0 && (
            <Button onClick={() => showModal(false)}>
              <PhoneOutlined /> {setLocale(true, 'add.phone')}
            </Button>
          )}
          <Button
            type="primary"
            onClick={() => history.push('/app/clients/address/create')}
            className="ml-3"
          >
            {setLocale(true, 'continue')} <ArrowRightOutlined />
          </Button>
        </div>
      </div>
      <Table locale={locale} dataSource={listContact} pagination={false}>
        {listContact.length && (
          <>
            <Column
              title="Número"
              dataIndex="number"
              key="number"
              render={number => number}
            />
            <Column
              title="Tipo"
              dataIndex="type"
              key="type"
              render={type => Enum.typePhone[type]}
            />
            <Column
              title=""
              key="actions"
              className="text-right"
              render={(text, record) => (
                <>
                  <Tooltip title="Editar Telefone" placement="left">
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

      <AddNewContactForm
        visible={modalVisible}
        onCreate={addContact}
        onCancel={closeModal}
        isEdit={isEdit}
        editContact={editContact}
      />
    </>
  );
}
