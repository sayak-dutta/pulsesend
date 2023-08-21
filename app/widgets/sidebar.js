"use client";
import React, { useEffect, useState } from "react";

import {
	AppstoreOutlined,
	ContactsOutlined,
	ContainerOutlined,
	DesktopOutlined,
	MailOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	PieChartOutlined,
	SettingOutlined,
	TeamOutlined,
	UserOutlined,
} from "@ant-design/icons";

import { Menu, Layout, Button, Space } from "antd";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setSiderCollapse } from "@/src/redux/slice/settingSlice";
import { signOut } from "next-auth/react";
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

function Sidebar() {
	const items = [
		getItem("Dashboard", "1", <PieChartOutlined />, "/dashboard"),
		getItem("Recipients", "2", <ContactsOutlined />, "/recipients"),
		getItem("Campaigns", "3", <MailOutlined />, "/campaigns"),
		getItem("Settings", "4", <SettingOutlined />, "/settings"),
	];

	const [collapsed, setCollapsed] = useState(false);
	const toggleCollapsed = () => {
		setCollapsed(!collapsed);
	};
	const pathName = usePathname();
	let selectedKey = null;
	const isMenuItemActive = (link) => pathName.includes(link);

	const settingsData = useSelector((i) => i.settings);

	const dispatch = useDispatch();

	useEffect(() => {
		if (window.innerWidth < 576) {
			setCollapsed(true);
		} else {
			setCollapsed(collapsed);
		}
	}, []);

	const handleCollapse = () => {
		setCollapsed(!collapsed);
		dispatch(setSiderCollapse(!collapsed));

		// collapsed ? dispatch(setSiderCollapse(false)) : dispatch(setSiderCollapse(true));
	};

	return (
		<Sider
			collapsible
			collapsed={collapsed}
			onCollapse={() => handleCollapse()}
			// onCollapse={(value) => setCollapsed(value)}
			style={{
				overflow: "auto",
				height: "100vh",
				position: "fixed",
				left: 0,
				top: 0,
				bottom: 0,
			}}
			breakpoint="md"
		>
			<div className="demo-logo-vertical" />
			<Image
				src={collapsed ? "/logo-blue.png" : "/pulsesend-alt.png"}
				className={collapsed ? "w-50 mx-auto my-3 d-flex" : "w-75 mx-auto my-3 d-flex"}
				width={150}
				height={collapsed ? 24 : 18}
				alt=""
			/>

			<Menu
				theme="dark"
				mode="inline"
				selectedKeys={[selectedKey]}
				inlineCollapsed={collapsed}
			>
				{items.map((item) => {
					// Compare the current pathname with the item's link
					return (
						<Menu.Item
							key={item.key}
							icon={item.icon}
							onClick={() => {
								dispatch(setSiderCollapse(false));
							}}
							className={isMenuItemActive(item.link) ? "ant-menu-item-selected" : ""}
						>
							{item.link ? (
								<Link href={item.link} t className="text-decoration-none">
									{item.label}
								</Link>
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
