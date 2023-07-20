"use client";
import React, { useState } from "react";
import {
	AppstoreOutlined,
	ContainerOutlined,
	DesktopOutlined,
	MailOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	PieChartOutlined,
	TeamOutlined,
	UserOutlined,
} from "@ant-design/icons";

import { Breadcrumb, Button, Layout, Menu } from "antd";
import Head from "next/head";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children, type) {
	return {
		key,
		icon,
		children,
		label,
		type,
	};
}
const items = [
	getItem("Dashboard", "1", <PieChartOutlined />),
	getItem("Recipients", "2", <TeamOutlined />),
	getItem("Option 3", "3", <ContainerOutlined />),
	getItem("Navigation One", "sub1", <MailOutlined />, [
		getItem("Option 5", "5"),
		getItem("Option 6", "6"),
		getItem("Option 7", "7"),
		getItem("Option 8", "8"),
	]),
	getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
		getItem("Option 9", "9"),
		getItem("Option 10", "10"),
		getItem("Submenu", "sub3", null, [getItem("Option 11", "11"), getItem("Option 12", "12")]),
	]),
];

function page() {
	const [collapsed, setCollapsed] = useState(false);
	const toggleCollapsed = () => {
		setCollapsed(!collapsed);
	};
	return (
		<>
			<Layout style={{ minHeight: "100vh" }}>
				<Sider
					collapsible
					collapsed={collapsed}
					onCollapse={(value) => setCollapsed(value)}
				>
					<div className="demo-logo-vertical" />
					<img
						src={collapsed ? "./logo-blue.png" : "./pulsesend-alt.png"}
						className={
							collapsed ? "w-50 mx-auto my-3 d-flex" : "w-75 mx-auto my-3 d-flex"
						}
						alt=""
					/>
					<Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline" items={items} />
				</Sider>
				<Layout>
					{/* <Header style={{ padding: 0, background: "#000" }} suffixCls=""/> */}
					<Content style={{ margin: "0 16px" }}>
						<Breadcrumb style={{ margin: "16px 0" }}>
							<Breadcrumb.Item>User</Breadcrumb.Item>
							<Breadcrumb.Item>Sayak</Breadcrumb.Item>
						</Breadcrumb>
						<div style={{ padding: 24, minHeight: 360, background: "#fff" }}>
							This is under development
						</div>
					</Content>
					<Footer style={{ textAlign: "center" }}>PulseSend ©2023</Footer>
				</Layout>
			</Layout>
		</>
	);
}

export default page;
