"use client";

import React, { useState } from "react";
import { Card, Tabs, Typography } from "antd";

import { ControlOutlined, IdcardOutlined } from "@ant-design/icons";
import UserProfileSettings from "../components/userProfileSettings";
import UserSMTPconfig from "../components/userSMTPconfig";

function page() {
	return (
		<Card style={{ padding: 24, minHeight: 360 }}>
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
			<Card>
				<Typography.Text>
					81% of B2B marketers say their most used form of content marketing is email
					newsletters. (Content Marketing Institute, 2020)
				</Typography.Text>
			</Card>
		</Card>
	);
}

export default page;
