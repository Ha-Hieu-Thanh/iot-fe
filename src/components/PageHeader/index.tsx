import React, { useContext } from 'react';
import Cookies from 'js-cookie';
// import avatarImg from 'assets/images/avatar.svg';
import { useNavigate } from "react-router-dom";
import styles from './styles.module.scss';
import { Menu, Dropdown } from 'antd';
import useToggleSideNav from 'utils/hooks/useToggleSideNav';
import useProfile from 'utils/hooks/useProfile';
import { logout } from 'utils/helper/authentication';

export default function PageHeader() {
  const { profile } = useProfile();
  const { toggleSideNav } = useToggleSideNav();

  const menu = (
    <Menu style={{ minWidth: 200 }}>
      <Menu.Item key="1">Profile</Menu.Item>
      <Menu.Item key="2">Change Password</Menu.Item>
      <Menu.Item key="3" onClick={logout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.headerWrapper}>
      <svg height="32" width="32" style={{ cursor: 'pointer' }} onClick={toggleSideNav}>
        <path d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z" />
      </svg>
      <div className={styles.menuWrapper}>
        <div className={styles.menuItem}>
          <Dropdown overlay={menu} trigger={['click']}>
            <div>
              <span>{`Hi ${profile?.fullName || profile?.name}!`}</span>
              &nbsp;
              {/* <img className={styles.icon} src={avatarImg} alt="" /> */}
            </div>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
