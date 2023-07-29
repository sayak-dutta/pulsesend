"use client";
import React, { useState } from "react";
import { Button, Layout, Table, Tabs } from "antd";
import Sidebar from "../widgets/sidebar";
import { Content, Footer } from "antd/es/layout/layout";
import { ControlOutlined, IdcardOutlined, ProfileOutlined } from "@ant-design/icons";

function page() {
	return (
		<div style={{ padding: 24, minHeight: 360, background: "#fff" }}>
			<Tabs
				defaultActiveKey="1"
				items={[
					{
						label: (
							<>
								<IdcardOutlined />
								Profile
							</>
						),
						key: 1,
						children: `Content of Tab Pane `,
					},
					{
						label: (
							<span className="">
								<ControlOutlined />
								Profile
							</span>
						),
						key: 2,
						children: `Contenthh `,
					},
				]}
			/>
		</div>
	);
}

export default page;
