"use client";
import React, { useEffect, useState } from "react";

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

import { Menu, Layout } from "antd";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
const { Sider } = Layout;
function getItem(label, key, icon, link, children) {
	return {
		key,
		icon,
		children,
		label,
		link, // Add the link property to the item
	};
}

const items = [
	getItem("Dashboard", "1", <PieChartOutlined />, "/dashboard"),
	getItem("Recipients", "2", <TeamOutlined />, "/recipients"),
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
function Sidebar() {
	const [collapsed, setCollapsed] = useState(false);
	const toggleCollapsed = () => {
		setCollapsed(!collapsed);
	};
	const pathName = usePathname();
	const isMenuItemActive = (link) => pathName === link;

	return (
		<Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
			<div className="demo-logo-vertical" />
			<img
				src={collapsed ? "./logo-blue.png" : "./pulsesend-alt.png"}
				className={collapsed ? "w-50 mx-auto my-3 d-flex" : "w-75 mx-auto my-3 d-flex"}
				alt=""
			/>
			<Menu theme="dark" mode="inline">
				{items.map((item) => {
					console.log(pathName);
					// Compare the current pathname with the item's link
					return (
						<Menu.Item
							key={item.key}
							icon={item.icon}
							className={isMenuItemActive(item.link) ? " ant-menu-item-active" : ""}
						>
							{item.link ? (
								<Link href={item.link}>{item.label}</Link>
							) : (
								<span>{item.label}</span>
							)}
						</Menu.Item>
					);
				})}
			</Menu>
		</Sider>
	);
}

export default Sidebar;
