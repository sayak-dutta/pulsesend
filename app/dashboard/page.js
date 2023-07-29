"use client";
import React, { useState } from "react";

import { Breadcrumb, Layout } from "antd";
import Sidebar from "../widgets/sidebar";
const { Content, Footer } = Layout;
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from "@ant-design/icons";
import { Steps } from "antd";

function page() {
	return (
		<>
			<div style={{ padding: 24, minHeight: 360, background: "#fff" }}>
				This is under development
				<Steps
					items={[
						{
							title: "Login",
							status: "finish",
							icon: <UserOutlined />,
						},
						{
							title: "Verification",
							status: "finish",
							icon: <SolutionOutlined />,
						},
						{
							title: "Pay",
							status: "process",
							icon: <LoadingOutlined />,
						},
						{
							title: "Done",
							status: "wait",
							icon: <SmileOutlined />,
						},
					]}
				/>
			</div>
		</>
	);
}

export default page;
