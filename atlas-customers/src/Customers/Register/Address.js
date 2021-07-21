/* eslint-disable no-alert */
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
  EnvironmentOutlined,
  LoadingOutlined,
  CheckOutlined,
  EditOutlined
} from '@ant-design/icons';
import { ROW_GUTTER } from 'constants/ThemeConstant';
import { useSelector, useDispatch } from 'react-redux';
import { setAddress, removeAddress, setEditAddress } from 'redux/actions';
import * as Enum from 'utils/enums';
import viaCep from 'utils/viaCep';
import MaskedInput from 'antd-mask-input';

const { Column } = Table;
const { Option } = Select;

const AddNewAddressForm = ({
  visible,
  onCreate,
  onCancel,
  isEdit,
  editAddress
}) => {
  const dispatch = useDispatch();
  const addresses = useSelector(({ person }) => person.addresses);
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (isEdit) {
      form.setFieldsValue({
        ...editAddress
      });
    } else {
      form.resetFields();
    }
  }, [editAddress, isEdit]);

  const fnChangeInput = e => {
    const { name, value: val } = e.target;
    setValues({
      ...values,
      [name]: val
    });
  };

  const fnChangeSelect = val => {
    setValues({
      ...values,
      type: val
    });
  };

  const fnViaCep = async e => {
    const { value: val } = e.target;
    const cep = val.replace(/\D/g, '');
    if (cep.length === 8) {
      setLoading(true);
      await viaCep(val).then(res => {
        form.setFieldsValue({
          ...values,
          code: res.data.cep,
          state: res.data.uf,
          city: res.data.localidade,
          street: res.data.logradouro,
          neighborhood: res.data.bairro
        });
        setValues({
          ...values,
          code: res.data.cep,
          state: res.data.uf,
          city: res.data.localidade,
          street: res.data.logradouro,
          neighborhood: res.data.bairro
        });
        setLoading(false);
      });
    }
  };

  return (
    <Modal
      title="Novo Endereço"
      visible={visible}
      okText="Salvar"
      cancelText="Cancelar"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(val => {
            if (isEdit) {
              dispatch(setEditAddress({ ...val }));
            } else {
              form.resetFields();
              dispatch(
                setAddress({ key: `address-${addresses.length + 1}`, ...val })
              );
            }
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form form={form} name="addAddressForm" layout="vertical">
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
              label="CEP"
              name="code"
              rules={[
                {
                  required: true,
                  message: 'Insira o número de telefone!'
                }
              ]}
            >
              <MaskedInput
                onChange={fnViaCep}
                mask="11111-111"
                name="code"
                suffix={loading ? <LoadingOutlined /> : <EnvironmentOutlined />}
                value={values.code}
                disabled={loading}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label="Tipo"
              name="type"
              rules={[
                {
                  required: true,
                  message: 'Insira o tipo do endereço!'
                }
              ]}
            >
              <Select
                values={values.type}
                name="type"
                onChange={fnChangeSelect}
                disabled={loading}
              >
                <Option value={0}>...</Option>
                <Option value={1}>Residencial</Option>
                <Option value={2}>Comercial</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label="Estado"
              name="state"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Insira o estado!'
                }
              ]}
            >
              <Input
                value={values.state}
                name="state"
                onChange={fnChangeInput}
                disabled={loading}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label="Cidade"
              name="city"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Insira a cidade!'
                }
              ]}
            >
              <Input
                value={values.city}
                name="city"
                onChange={fnChangeInput}
                disabled={loading}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={18}>
            <Form.Item
              label="Logradouro"
              name="street"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Insira o logradouro!'
                }
              ]}
            >
              <Input
                value={values.street}
                name="street"
                onChange={fnChangeInput}
                disabled={loading}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={6}>
            <Form.Item
              label="Número"
              name="number"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Insira o número!'
                }
              ]}
            >
              <Input
                value={values.number}
                name="number"
                onChange={fnChangeInput}
                disabled={loading}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label="Bairro"
              name="neighborhood"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Insira o bairro!'
                }
              ]}
            >
              <Input
                value={values.neighborhood}
                name="neighborhood"
                onChange={fnChangeInput}
                disabled={loading}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item label="Complemento" name="reference" hasFeedback>
              <Input
                value={values.reference}
                name="reference"
                onChange={fnChangeInput}
                disabled={loading}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default function Address() {
  const dispatch = useDispatch();
  const addresses = useSelector(({ person }) => person.addresses);
  const [listAddress, setListAddress] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editAddress, setEditAddress] = useState(null);

  useEffect(() => {
    if (addresses) {
      setListAddress([...addresses]);
    }
  }, [addresses]);

  const showModal = (edit, elm) => {
    setIsEdit(edit);
    setModalVisible(true);
    if (edit) {
      setEditAddress(elm);
    } else {
      setEditAddress(null);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const addAddress = values => {
    const { code, type, state, city, street, number, neighborhood, reference } =
      values;
    setModalVisible(false);
    setListAddress({
      key: `address-${listAddress.length + 1}`,
      code,
      type,
      state,
      city,
      street,
      number,
      neighborhood,
      reference
    });
  };

  const fnRemoveAddress = (text, record) => {
    const newAddress = [...listAddress];
    const remove = newAddress.filter(item => item.key !== record.key);
    setListAddress(remove);
    dispatch(removeAddress(remove));
  };

  const locale = {
    emptyText: (
      <div className="text-center my-4">
        <EnvironmentOutlined style={{ fontSize: 70 }} />
        <h3 className="mt-3 font-weight-light">Nenhum endereço encontrado!</h3>
        <div className="mt-3">
          <Button onClick={() => showModal(false)}>
            <EnvironmentOutlined /> Adicionar Novo Endereço
          </Button>
        </div>
      </div>
    )
  };

  const confirm = ({ elm }) => {
    fnRemoveAddress(elm.text, elm.record);
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
        <Tooltip title="Remover Endereço">
          <Button type="link" shape="circle" icon={<DeleteOutlined />} />
        </Tooltip>
      </Popconfirm>
    );
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Lista de Endereços</h2>
        <div>
          {listAddress.length !== 0 && (
            <Button onClick={() => showModal(false)}>
              <EnvironmentOutlined /> Adicionar Novo Endereço
            </Button>
          )}
          <Button type="primary" className="ml-3">
            Finalizar <CheckOutlined />
          </Button>
        </div>
      </div>
      <Table locale={locale} dataSource={listAddress} pagination={false}>
        {listAddress.length && (
          <>
            <Column
              title="CEP"
              dataIndex="code"
              key="code"
              render={code => code}
            />
            <Column title="Logradouro" dataIndex="street" key="street" />
            <Column
              title="Logradouro"
              dataIndex="neighborhood"
              key="neighborhood"
            />
            <Column
              title="Tipo"
              dataIndex="type"
              key="type"
              render={type => Enum.typeAddress[type]}
            />
            <Column
              title=""
              key="actions"
              className="text-right"
              render={(text, record) => (
                <>
                  <Tooltip title="Editar Endereço" placement="left">
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
      <div className="mt-3 text-right"></div>
      <AddNewAddressForm
        visible={modalVisible}
        onCreate={addAddress}
        onCancel={closeModal}
        isEdit={isEdit}
        editAddress={editAddress}
      />
    </>
  );
}
