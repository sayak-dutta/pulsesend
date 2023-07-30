"use client";
import React, { useState } from "react";

import { Breadcrumb, Card, Col, Layout, Row, Statistic } from "antd";
import Sidebar from "../widgets/sidebar";
const { Content, Footer } = Layout;
import {
	ArrowDownOutlined,
	ArrowUpOutlined,
	LoadingOutlined,
	SmileOutlined,
	SolutionOutlined,
	UserOutlined,
} from "@ant-design/icons";
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
				<Row gutter={16}>
					<Col span={6}>
						<Card bordered={false}>
							<Statistic
								title="Active"
								value={11.28}
								precision={2}
								valueStyle={{
									color: "#3f8600",
								}}
								prefix={<ArrowUpOutlined />}
								suffix="%"
							/>
						</Card>
					</Col>
					<Col span={6}>
						<Card bordered={false}>
							<Statistic
								title="Idle"
								value={9.3}
								precision={2}
								valueStyle={{
									color: "#cf1322",
								}}
								prefix={<ArrowDownOutlined />}
								suffix="%"
							/>
						</Card>
					</Col>
				</Row>
			</div>
		</>
	);
}

export default page;
