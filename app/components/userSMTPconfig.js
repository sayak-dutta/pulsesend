import { Button, Col, Form, Input, Radio, Row, Space } from "antd";
import React, { useState } from "react";



function UserSMTPconfig() {
	const [form] = Form.useForm();
	const [formLayout, setFormLayout] = useState("horizontal");
	const onFormLayoutChange = ({ layout }) => {
		setFormLayout(layout);
	};

	return (
		<Form
			layout="vertical"
			form={form}
			onValuesChange={onFormLayoutChange}
			style={{
				maxWidth: formLayout === "inline" ? "none" : 600,
			}}
		>
			<Form.Item >

			</Form.Item>
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
			<Form.Item>
				<Button type="primary">Save</Button>
			</Form.Item>
		</Form>
	);
}

export default UserSMTPconfig;
