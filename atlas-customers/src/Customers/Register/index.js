import React, { Component } from 'react';
import {
  UserOutlined,
  LockOutlined,
  BellOutlined,
  ExclamationCircleOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  MailOutlined
} from '@ant-design/icons';
import { Menu } from 'antd';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import InnerAppLayout from 'layouts/inner-app-layout';
import EditProfile from './EditProfile';
import ChangePassword from './ChangePassword';
import Address from './Address';
import Emails from './Emails';
import Contacts from './Contacts';
import { useSelector } from 'react-redux';
import { setLocale } from 'utils/setLocale';

const iconNotfound = {
  fontSize: '100px',
  color: '#08c',
  marginBottom: '14px'
};

const containerNotfound = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  height: '100%'
};

const SettingOption = ({ match, location }) => {
  const { dataBasic } = useSelector(({ person }) => person);

  return (
    <Menu
      defaultSelectedKeys={dataBasic._id != null ? `${match.url}/${dataBasic._id}/personal-data/update` : `${match.url}/personal-data/create`}
      mode="inline"
      selectedKeys={[location.pathname]}
    >
      <Menu.Item key={dataBasic._id != null ? `${match.url}/${dataBasic._id}/personal-data/update` : `${match.url}/personal-data/create`}>
        <UserOutlined />
        <span>{setLocale(true, 'menu.label.basic.data')}</span>
        <Link to={dataBasic._id != null ? `${match.url}/${dataBasic._id}/personal-data/update` : `${match.url}/personal-data/create`} />
      </Menu.Item>
      <Menu.Item key={dataBasic._id != null ? `${match.url}/${dataBasic._id}/change-password/update` : `${match.url}/change-password/create`}>
        <LockOutlined />
        <span>{setLocale(true, 'menu.label.security')}</span>
        <Link to={dataBasic._id != null ? `${match.url}/${dataBasic._id}/change-password/update` : `${match.url}/change-password/create`} />
      </Menu.Item>
      <Menu.Item key={dataBasic._id != null ? `${match.url}/${dataBasic._id}/emails/update` : `${match.url}/emails/create`}>
        <MailOutlined />
        <span>{setLocale(true, 'menu.label.emails')}</span>
        <Link to={dataBasic._id != null ? `${match.url}/${dataBasic._id}/emails/update` : `${match.url}/emails/create`} />
      </Menu.Item>
      <Menu.Item key={dataBasic._id != null ? `${match.url}/${dataBasic._id}/contacts/update` : `${match.url}/contacts/create`}>
        <PhoneOutlined />
        <span>{setLocale(true, 'menu.label.phones')}</span>
        <Link to={dataBasic._id != null ? `${match.url}/${dataBasic._id}/contacts/update` : `${match.url}/contacts/create`} />
      </Menu.Item>
      <Menu.Item key={dataBasic._id != null ? `${match.url}/${dataBasic._id}/address/update` : `${match.url}/address/create`}>
        <EnvironmentOutlined />
        <span>{setLocale(true, 'menu.label.adresses')}</span>
        <Link to={dataBasic._id != null ? `${match.url}/${dataBasic._id}/address/update` : `${match.url}/address/create`} />
      </Menu.Item>
    </Menu>
  );
};

const SettingContent = ({ match }) => {
  const { dataBasic } = useSelector(({ person }) => person);

  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={dataBasic._id != null ? `${match.url}/:id/personal-data/update` : `${match.url}/personal-data/create`} />
      <Route path={dataBasic._id != null ? `${match.url}/:id/personal-data/update` : `${match.url}/personal-data/create`} component={EditProfile} />
      <Route path={dataBasic._id != null ? `${match.url}/:id/change-password/update` : `${match.url}/change-password/create`} component={ChangePassword} />
      <Route path={dataBasic._id != null ? `${match.url}/:id/emails/update` : `${match.url}/emails/create`} component={Emails} />
      <Route path={dataBasic._id != null ? `${match.url}/:id/contacts/update` : `${match.url}/contacts/create`} component={Contacts} />
      <Route path={dataBasic._id != null ? `${match.url}/:id/address/update` : `${match.url}/address/create`} component={Address} />
      <Route>
        <div style={containerNotfound}>
          <ExclamationCircleOutlined style={iconNotfound} />
          <h1>{setLocale(true, 'page.not.found')}</h1>
        </div>
      </Route>
    </Switch>
  );
};

export class Register extends Component {
  render() {
    return (
      <InnerAppLayout
        sideContentWidth={320}
        sideContent={<SettingOption {...this.props} />}
        mainContent={<SettingContent {...this.props} />}
      />
    );
  }
}

export default Register;
