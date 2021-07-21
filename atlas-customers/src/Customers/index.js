/* eslint-disable no-alert */
import { useState } from 'react';
import { Card, Table, Tooltip, Button } from 'antd';
import { EditOutlined, UserAddOutlined, EyeOutlined } from '@ant-design/icons';
import ClientView from './ClientView';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import * as Enum from 'utils/enums';
import { useDispatch } from 'react-redux';
import { setClient, resetClient } from 'redux/actions';
import { setLocale } from 'utils/setLocale';

export function ClientList(props) {
  const dispatch = useDispatch();
  const { history, localization } = props;
  const [users, setUsers] = useState([]);
  const [clientVisible, setClientVisible] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const fnShowClient = client => {
    setClientVisible(true);
    setSelectedClient(client);
  };

  const fnCloseClient = () => {
    setClientVisible(false);
    setSelectedClient(null);
  };

  const fnEditClient = clientInfo => {
    dispatch(setClient(clientInfo));
    history.push(`/app/clients/${clientInfo._id}/personal-data/update`);
  };

  const fnNewClient = () => {
    dispatch(resetClient());
    history.push(`/app/clients/personal-data/create`);
  };

  const tableColumns = [
    {
      title: 'Nome',
      dataIndex: 'name',
      render: (_, record) => (
        <div className="d-flex">
          <AvatarStatus
            src={record.img}
            name={record.name}
            subTitle={record.email}
          />
        </div>
      ),
      sorter: {
        compare: (a, b) => {
          a = a.name.toLowerCase();
          b = b.name.toLowerCase();
          return a > b ? -1 : b > a ? 1 : 0;
        }
      }
    },
    {
      title: 'Genero',
      dataIndex: 'gender',
      render: gender => Enum.gender[gender],
      sorter: {
        compare: (a, b) => a.gender.length - b.gender.length
      }
    },
    {
      title: 'Cidade de Nascimento',
      dataIndex: 'cityOfBirth',
      sorter: (a, b) => a.cityOfBirth.length - b.cityOfBirth.length
    },
    {
      title: '',
      dataIndex: 'actions',
      render: (_, elm) => (
        <div className="text-right d-flex justify-content-end">
          <Tooltip title="Visualizar" placement="left">
            <Button
              className="mr-2"
              icon={<EyeOutlined />}
              onClick={() => fnShowClient(elm)}
              size="small"
            />
          </Tooltip>
          <Tooltip title="Editar">
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => fnEditClient(elm)}
              size="small"
            />
          </Tooltip>
        </div>
      )
    }
  ];

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>{setLocale(true, 'title.page.list.clients')}</h2>
        <div>
          <Button
            type="primary"
            icon={<UserAddOutlined className="mr-2" />}
            onClick={fnNewClient}
          >
            {setLocale(true, 'button.new.client')}
          </Button>
        </div>
      </div>
      <Card bodyStyle={{ padding: '0px' }}>
        <div className="table-responsive">
          <Table columns={tableColumns} dataSource={users} rowKey="id" />
        </div>
        <ClientView
          data={selectedClient}
          visible={clientVisible}
          close={() => {
            fnCloseClient();
          }}
        />
      </Card>
    </>
  );
}

export default ClientList;
