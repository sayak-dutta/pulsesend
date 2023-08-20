import React, { useState } from "react";
import { Button, Col, Form, Input, Modal, Row, Select, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-toastify";
import ToastContainerCustom from "./toastContainerCustom";
import { useDispatch } from "react-redux";
import recipientSlice, { fetchRecipients } from "@/src/redux/slice/recipientSlice";

function UploadRecipientModal({ recipientModalOpen, setRecipientModalOpen }) {
	const [open, setOpen] = useState(false);
	const [form] = Form.useForm();
	const dispatch = useDispatch();

	const addRecipient = (data) => {
		let recipientData = data.getFieldValue();

		axios
			.post("/api/v1/recipient/add", recipientData)
			.then((resp) => {
				message.success(resp?.data?.message);
				dispatch(fetchRecipients(resp?.data?.recipients));
				setRecipientModalOpen(false);
			})
			.catch((err) => {
				message.error(err?.response?.data?.message);
			});
	};

	return (
		<Modal
			title="Add Recipients"
			centered
			open={recipientModalOpen}
			onOk={() => addRecipient(form)}
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
				<Form.Item
					name="email"
					label="Email"
					rules={[
						{
							type: "email",
							message: "The input is not valid E-mail!",
						},
						{
							required: true,
							message: "Please input your E-mail!",
						},
					]}
				>
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
