import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "antd";
import classNames from "classnames";
import {
  HomeOutlined,
  TableOutlined,
  SettingOutlined,
  LineChartOutlined
} from "@ant-design/icons";
import styles from "./styles.module.scss";
import useToggleSideNav from "utils/hooks/useToggleSideNav";

const { SubMenu } = Menu;

export default function SideNav() {
  const { collapsed } = useToggleSideNav();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState("1");

  const routes = [
    {
      key: "1",
      text: "Home",
      url: "/",
      icon: <HomeOutlined />,
    },
    {
      key: "2",
      text: "Subcription",
      url: "/subcription",
      icon: <TableOutlined />,
    },
    {
      key: "3",
      text: "Settings",
      icon: <SettingOutlined />,
      children: [
        {
          key: "3.1",
          text: "Alert Management",
          url: "/settings/alert",
        },
        {
          key: "3.2",
          text: "Location Management",
          url: "/settings/location",
        },
      ],
    },
    {
      key: "4",
      text: "Chart",
      url: "/chart",
      icon: <LineChartOutlined />,
    },
  ];

  useEffect(() => {
    routes.forEach((route) => {
      if (location.pathname.startsWith(route.url || "###")) {
        setSelectedKey(route.key);
      }
      if (route.children) {
        route.children.forEach((childRoute) => {
          if (location.pathname.startsWith(childRoute.url || "###")) {
            setSelectedKey(childRoute.key);
          }
        });
      }
    });
  }, [location.pathname, routes]);

  return (
    <div
      className={classNames({
        [styles.sideNav]: true,
        [styles.sideNavCollapsed]: collapsed,
      })}
      style={{ width: collapsed ? 80 : 250, transition: "width 0.3s" }}
    >
      <Link className={styles.logo} to="/">
        HOME
      </Link>
      <Menu
        selectedKeys={[selectedKey]}
        defaultOpenKeys={[]}
        mode="inline"
        inlineCollapsed={collapsed}
      >
        {routes.map((route) => {
          // console.log("routes", routes);
          if (route.children) {
            return (
              <SubMenu key={route.key} icon={route.icon} title={route.text}>
                {route.children?.map((childRoute) => (
                  <Menu.Item key={childRoute.key}>
                    <Link to={childRoute.url}>{childRoute.text}</Link>
                  </Menu.Item>
                ))}
              </SubMenu>
            );
          }
          return (
            <Menu.Item key={route.key} icon={route.icon}>
              <Link to={route.url}>{route.text}</Link>
            </Menu.Item>
          );
        })}
      </Menu>
    </div>
  );
}
