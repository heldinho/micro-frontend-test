/* eslint-disable no-alert */
import React, { useEffect } from 'react';
import {
  Form,
  Avatar,
  Button,
  Input,
  DatePicker,
  Row,
  Col,
  message,
  Upload,
  Card,
  Select,
  Switch
} from 'antd';
import {
  UserOutlined,
  ArrowRightOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import { ROW_GUTTER } from 'constants/ThemeConstant';
import Flex from 'components/shared-components/Flex';
import { useSelector, useDispatch } from 'react-redux';
import { setPerson } from 'redux/actions/Person';
import MaskedInput from 'antd-mask-input';

const { Option } = Select;

export default function EditProfile(props) {
  const dispatch = useDispatch();
  const person = useSelector(({ person }) => person.dataBasic);
  const avatarEndpoint = 'https://www.mocky.io/v2/5cc8019d300000980a055e76';
  const [values, setValues] = React.useState({});

  useEffect(() => {
    if (person) {
      setValues({
        ...person
      });
    }
  }, []);

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const onFinish = val => {
    const key = 'updatable';
    message.loading({ content: 'Updating...', key });
    setTimeout(() => {
      dispatch(
        setPerson({
          ...val
        })
      );
      message.success({ content: 'Done!', key, duration: 2 });
      setTimeout(() => {
        props.history.push('/app/clients/change-password/create');
      }, 1000);
    }, 1000);
  };

  const onFinishFailed = errorInfo => {
    // console.log('Failed:', errorInfo);
  };

  const onUploadAavater = info => {
    const key = 'updatable';
    if (info.file.status === 'uploading') {
      message.loading({ content: 'Uploading...', key, duration: 1000 });
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, imageUrl => {
        setValues({
          ...values,
          img: imageUrl
        });
      });
      message.success({ content: 'Uploaded!', key, duration: 1.5 });
    }
  };

  const onRemoveAvater = () => {
    setValues({
      ...values,
      img: ''
    });
  };

  const onSelect = payload => {
    setValues({
      ...values,
      [payload.name]: payload.val
    });
  };

  const onChange = e => {
    const { name, value: val } = e.target;
    setValues({
      ...values,
      [name]: val
    });
  };

  return (
    <>
      <Flex
        alignItems="center"
        mobileFlex={false}
        className="text-center text-md-left"
      >
        <Avatar size={90} src={values.img} icon={<UserOutlined />} />
        <div className="ml-3 mt-md-0 mt-3">
          <Upload
            onChange={onUploadAavater}
            showUploadList={false}
            action={avatarEndpoint}
          >
            <Button type="primary">Change Avatar</Button>
          </Upload>
          <Button className="ml-2" onClick={onRemoveAvater}>
            Remove
          </Button>
        </div>
      </Flex>
      <div className="mt-4">
        <Form
          name="basicInformation"
          layout="vertical"
          initialValues={{
            ...person
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Row>
            <Col xs={24} sm={24} md={24} lg={24}>
              <Row gutter={ROW_GUTTER}>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label="Nome Completo"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: 'Insira seu nome!'
                      }
                    ]}
                    value={values.name}
                  >
                    <Input value={values.name} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label="Nome Social"
                    name="nameSocial"
                    value={values.nameSocial}
                    rules={[
                      {
                        required: false,
                        message: 'Insira seu nome social!'
                      }
                    ]}
                  >
                    <Input name="nameSocial" value={values.nameSocial} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={8}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        type: 'email',
                        message: 'Digite um email válido!'
                      }
                    ]}
                  >
                    <Input value={values.email} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={8}>
                  <Form.Item
                    label="Data de Nascimento"
                    name="dateOfBirth"
                    rules={[
                      {
                        required: true,
                        message: 'Insira sua data de nascimento!'
                      }
                    ]}
                  >
                    <MaskedInput
                      mask="11/11/1111"
                      name="dateOfBirth"
                      suffix={<CalendarOutlined />}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={8}>
                  <Form.Item
                    label="Estado Civil"
                    name="civilState"
                    rules={[
                      {
                        required: true,
                        message: 'Selecione o estado civil!'
                      }
                    ]}
                  >
                    <Select>
                      <Option value={0}>...</Option>
                      <Option value={1}>Casado(a)</Option>
                      <Option value={2}>Divorciado(a)</Option>
                      <Option value={3}>Separado(a) Judicialmente</Option>
                      <Option value={4}>Solteiro(a)</Option>
                      <Option value={5}>Viúvo(a)</Option>
                      <Option value={6}>União Estável</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={8}>
                  <Form.Item
                    label="Cidade de Nascimento"
                    name="cityOfBirth"
                    rules={[
                      {
                        required: true,
                        message: 'Digite a cidade de nascimento válido!'
                      }
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={8}>
                  <Form.Item
                    label="Estado de Nascimento"
                    name="stateOfBirth"
                    rules={[
                      {
                        required: true,
                        message: 'Digite um estado de nascimento válido!'
                      }
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={8}>
                  <Form.Item label="Escolaridade" name="schooling">
                    <Select>
                      <Option value={0}>...</Option>
                      <Option value={1}>Fundamental Incompleto</Option>
                      <Option value={2}>Fundamental Completo</Option>
                      <Option value={3}>Médio Incompleto</Option>
                      <Option value={4}>Médio Completo</Option>
                      <Option value={5}>Superior Incompleto</Option>
                      <Option value={6}>Superior Completo</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={8}>
                  <Form.Item
                    label="Gênero"
                    name="gender"
                    rules={[
                      {
                        required: true,
                        message: 'Selecione um gênero!'
                      }
                    ]}
                  >
                    <Select>
                      <Option value={0}>...</Option>
                      <Option value={1}>Masculino</Option>
                      <Option value={2}>Feminino</Option>
                      <Option value={3}>Outros</Option>
                      <Option value={4}>Prefere não informar</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={8}>
                  <Form.Item label="Cor" name="color">
                    <Select>
                      <Option value={0}>...</Option>
                      <Option value={1}>Amarelo</Option>
                      <Option value={2}>Branca</Option>
                      <Option value={3}>Parda</Option>
                      <Option value={4}>Preta</Option>
                      <Option value={5}>Indígena</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={8}>
                  <Form.Item
                    label="Pessoa Publicamente Exposta (PEP)"
                    style={{ textAlign: 'center' }}
                    name="personPublic"
                  >
                    <Switch value={values.personPublic} />
                  </Form.Item>
                </Col>

                {/* Phones to contact */}
                <Col xs={24} sm={24} md={8}>
                  <Form.Item
                    label="Nome da Mãe"
                    name="nameMother"
                    rules={[
                      {
                        required: true,
                        message: 'Insira o nome completo da mãe!'
                      }
                    ]}
                  >
                    <Input name="nameMother" onChange={onChange} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={8}>
                  <Form.Item label="Nome do Pai" name="nameFather">
                    <Input name="nameFather" onChange={onChange} />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={8}>
                  <Form.Item label="PCD" name="pcd">
                    <Select onChange={val => onSelect({ val, name: 'pcd' })}>
                      <Option value={0}>Não</Option>
                      <Option value={1}>Deficiência auditiva</Option>
                      <Option value={2}>Deficiência de fala</Option>
                      <Option value={3}>Deficiência visual</Option>
                      <Option value={4}>Deficiência motora</Option>
                      <Option value={5}>Gravidez</Option>
                      <Option value={6}>Possui outras condições</Option>
                    </Select>
                  </Form.Item>
                </Col>

                {values.pcd === 6 && (
                  <Col xs={24} sm={24} md={24}>
                    <Form.Item label="Qual ?" name="pcdOther">
                      <Input name="pcdOther" onChange={onChange} />
                    </Form.Item>
                  </Col>
                )}

                {/* End Phones to contact */}

                <Card
                  size="small"
                  title="Informações de Documentos"
                  style={{ width: '100%' }}
                >
                  <Row gutter={ROW_GUTTER}>
                    <Col xs={24} sm={24} md={8}>
                      <Form.Item
                        label="CPF"
                        name="cpf"
                        rules={[
                          {
                            required: true,
                            message: 'Digite um CPF válido!'
                          }
                        ]}
                      >
                        <MaskedInput mask="111.111.111-11" name="cpf" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8}>
                      <Form.Item
                        label="Passaporte"
                        name="passportNumber"
                        rules={[
                          {
                            required: true,
                            message: 'Digite um passaporte válido!'
                          }
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8}>
                      <Form.Item
                        label="Título de Eleitor"
                        name="voterTitle"
                        rules={[
                          {
                            required: true,
                            message: 'Digite um título de eleitor válido!'
                          }
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={ROW_GUTTER}>
                    <Col xs={24} sm={24} md={6}>
                      <Form.Item
                        label="RG"
                        name="rg"
                        rules={[
                          {
                            required: true,
                            message: 'Digite um RG válido!'
                          }
                        ]}
                      >
                        <MaskedInput mask="11.111.111-1" name="cpf" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6}>
                      <Form.Item
                        label="Órgão Emissor"
                        name="docOrgan"
                        rules={[
                          {
                            required: true,
                            message: 'Insira o órgão emissor!'
                          }
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6}>
                      <Form.Item
                        label="Estado"
                        name="docState"
                        rules={[
                          {
                            required: true,
                            message: 'Insira o estado!'
                          }
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6}>
                      <Form.Item
                        label="Data de Emissão"
                        name="docDate"
                        rules={[
                          {
                            required: true,
                            message: 'Insira o estado!'
                          }
                        ]}
                      >
                        <MaskedInput
                          mask="11/11/1111"
                          name="docDate"
                          suffix={<CalendarOutlined />}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>
              </Row>
              <div className="d-flex justify-content-end align-items-center">
                <Button type="primary" htmlType="submit">
                  Continuar <ArrowRightOutlined />
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
}
