import React, { Component } from 'react';
import Link from 'next/link'
import { Menu, Icon, Row } from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const MenuStyle = {
    float: "right"
}

const LogoStyle = {
  fontSize: "18px"
}

class MenuOut extends Component {


    render() {
        
        return (
            <Menu
            mode="horizontal"
            theme="light"
            style={{
              background: "transparent", 
              border: "none"
              }}
          >
              
            <Menu.Item key="logo" className="menu_hover">
             <a className="menu-link" href={"/"}><span style={LogoStyle}> HACKCOIN </span></a>
            </Menu.Item>
            <Menu.Item className="menu-hover" key="github" style={MenuStyle}>
              <a className="menu-link" href={"/auth/github"}>
              <Icon type="github" />
              </a>
            </Menu.Item>
            <Menu.Item className="menu-hover" key="login" style={MenuStyle}>
              <a className="menu-link" href={"/login"}>
              Login
              </a>
            </Menu.Item>
            <Menu.Item className="menu-hover" key="register" style={MenuStyle}>
              <a className="menu-link" href={"/signup"} >
              Register
              </a>            
            </Menu.Item>
            <Menu.Item className="menu-hover" style={MenuStyle} key="home">
              <a className="menu-link" href={"/"}>
              Home
              </a>
            </Menu.Item>
            </Menu>
        )
    }
}

export default MenuOut;