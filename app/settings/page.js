"use client";

import React, { useState } from "react";
import { Tabs } from "antd";

import { ControlOutlined, IdcardOutlined } from "@ant-design/icons";
import UserProfileSettings from "../components/userProfileSettings";
import UserSMTPconfig from "../components/userSMTPconfig";

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
						children: <UserProfileSettings />,
					},
					{
						label: (
							<>
								<ControlOutlined />
								SMTP
							</>
						),
						key: 2,
						children: <UserSMTPconfig />,
					},
				]}
			/>
		</div>
	);
}

export default page;
