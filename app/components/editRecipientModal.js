import React, { useState } from "react";
import { Button, Col, Form, Input, Modal, Row, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-toastify";
import ToastContainerCustom from "./toastContainerCustom";

function EditRecipientModal({ editRecipientModalOpen, setEditRecipientModalOpen, recipient_id }) {
	const [open, setOpen] = useState(false);
	const [form] = Form.useForm();
	const formData = form.getFieldsValue();

	let recipientData = { ...formData, recipient_id };

	const editRecipient = () => {
		console.log(recipientData);
		// axios
		// 	.post("/api/v1/recipient/edit", { formData })
		// 	.then((resp) => {
		// 		toast.success(resp.data.message);
		// 		setRecipientModalOpen(false);
		// 	})
		// 	.catch(() => {
		// 		toast.error(resp.data.message);
		// 	});
	};

	return (
		<Modal
			title="Edit Recipients"
			centered
			open={editRecipientModalOpen}
			onOk={() => editRecipient()}
			onCancel={() => setEditRecipientModalOpen(false)}
			okText={"Save"}
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

export default EditRecipientModal;
