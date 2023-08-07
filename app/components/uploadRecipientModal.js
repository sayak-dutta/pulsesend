import React, { useState } from "react";
import { Button, Col, Form, Input, Modal, Row, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-toastify";
import ToastContainerCustom from "./toastContainerCustom";

function UploadRecipientModal({ recipientModalOpen, setRecipientModalOpen }) {
	const [open, setOpen] = useState(false);
	const [form] = Form.useForm();
	const formData = form.getFieldsValue();

	const addRecipient = () => {
		axios
			.post("/api/v1/recipient/add", { formData })
			.then((resp) => {
				toast.success(resp.data.message);
				setRecipientModalOpen(false);
			})
			.catch(() => {
				toast.error(resp.data.message);
			});
	};

	return (
		<Modal
			title="Add Recipients"
			centered
			open={recipientModalOpen}
			onOk={() => addRecipient()}
			onCancel={() => setRecipientModalOpen(false)}
			okText={
				<>
					<PlusOutlined />
					&nbsp;Add
				</>
			}
		>
			<ToastContainerCustom />
			<Form
				layout="vertical"
				form={form}
				style={{
					maxWidth: 600,
				}}
			>
				<Row gutter={16}>
					<Col md={12} sm={24} xs={24}>
						<Form.Item name={"first_name"} label="First Name">
							<Input placeholder="John" required />
						</Form.Item>
					</Col>
					<Col md={12} sm={24} xs={24}>
						<Form.Item name={"last_name"} label="Last Name">
							<Input placeholder="Doe" />
						</Form.Item>
					</Col>
				</Row>
				<Form.Item name="email" label="Email">
					<Input placeholder="john@example.com" />
				</Form.Item>
				{/* 
				<Form.Item label="Password">
					<Input placeholder="input placeholder" type="password" />
				</Form.Item> */}
			</Form>
		</Modal>
	);
}

export default UploadRecipientModal;
