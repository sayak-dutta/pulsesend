import { Button, Col, Form, Input, Radio, Row, Select, Space } from "antd";
import React, { useState } from "react";
import moment from "moment-timezone";

const allTimeZones = moment.tz.names();

const options = [
	{ value: "UTC", label: "UTC" }, // Include UTC as an option
	...allTimeZones.map((tz) => ({
		value: tz,
		label: tz === "GMT" ? "GMT (Greenwich Mean Time)" : tz,
	})),
];

function UserProfileSettings() {
	const [form] = Form.useForm();

	return (
		<Form
			layout="vertical"
			form={form}
			style={{
				maxWidth: 600,
			}}
		>
			<Row gutter={16}>
				<Col md={12} sm={24} xs={24}>
					<Form.Item label="First Name">
						<Input placeholder="John" />
					</Form.Item>
				</Col>
				<Col md={12} sm={24} xs={24}>
					<Form.Item label="Last Name">
						<Input placeholder="Doe" />
					</Form.Item>
				</Col>
			</Row>
			<Form.Item label="Email">
				<Input placeholder="john@example.com" />
			</Form.Item>

			<Form.Item label="Password">
				<Input placeholder="input placeholder" type="password" />
			</Form.Item>
			<Form.Item label="Time Zone">
				<Select options={options} showSearch />
			</Form.Item>
			<Form.Item>
				<Button type="primary">Save</Button>
			</Form.Item>
		</Form>
	);
}

export default UserProfileSettings;
