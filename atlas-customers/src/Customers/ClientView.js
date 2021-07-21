import React from 'react';
import { Avatar, Drawer, Divider } from 'antd';
import {
  MobileOutlined,
  MailOutlined,
  UserOutlined,
  CompassOutlined,
  CalendarOutlined,
  GlobalOutlined,
  TeamOutlined
} from '@ant-design/icons';
import * as Enum from 'utils/enums';

export function UserView(props) {
  const { data, visible, close } = props;

  return (
    <Drawer
      width={400}
      placement="right"
      onClose={close}
      closable={false}
      visible={visible}
    >
      <div className="text-center mt-3">
        <Avatar size={80} src={data?.img} />
        <h3 className="mt-2 mb-0">{data?.name}</h3>
        <span className="text-muted">{data?.email}</span>
      </div>
      <Divider dashed />
      <div className="">
        <h6 className="text-muted text-uppercase mb-2">DETALHES DO CLIENTE</h6>
        <p>
          <UserOutlined />
          <span className="ml-3 text-dark">id: {data?.id}</span>
        </p>
        <p>
          <UserOutlined />
          <span className="ml-3 text-dark">{Enum.gender[data?.gender]}</span>
        </p>
        <p>
          <UserOutlined />
          <span className="ml-3 text-dark">
            {Enum.civilState[data?.civilState]}
          </span>
        </p>
        <h6 className="text-muted text-uppercase mt-2 mb-2">PARENTESCO</h6>
        <p>
          <TeamOutlined />
          <span className="ml-3 text-dark">{data?.nameMother}</span>
        </p>
        <p>
          <TeamOutlined />
          <span className="ml-3 text-dark">{data?.nameFather}</span>
        </p>
      </div>
      <div className="mt-5">
        <h6 className="text-muted text-uppercase mb-3">CONTATO</h6>
        <p>
          <MobileOutlined />
          <span className="ml-3 text-dark">{data?.phones[0].number}</span>
        </p>
        <p>
          <MailOutlined />
          <span className="ml-3 text-dark">
            {data?.emails ? data?.emails[0].email : '-'}
          </span>
        </p>
        <p>
          <CompassOutlined />
          <span className="ml-3 text-dark">{`${data?.addresses[0].street}, ${data?.addresses[0].number}`}</span>
        </p>
        <p>
          <CompassOutlined />
          <span className="ml-3 text-dark">{`${data?.addresses[0].city}, ${data?.addresses[0].state} - ${data?.addresses[0].cep}`}</span>
        </p>
      </div>
    </Drawer>
  );
}

export default UserView;
