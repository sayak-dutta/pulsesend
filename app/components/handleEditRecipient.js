import EditRecipientModal from "./editRecipientModal";
import React, { useState } from "react";
import { Button, Col, Form, Input, Modal, Row, Select, message } from "antd";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { fetchRecipients } from "@/src/redux/slice/recipientSlice";
import { useDispatch } from "react-redux";

function HandleEditRecipient({ recipientData }) {
	const [editRecipientModalOpen, setEditRecipientModalOpen] = useState(false);

	const [form] = Form.useForm();
	const dispatch = useDispatch();

	const editRecipient = (data) => {
		let dataToSubmit = { ...data, _id: recipientData._id };

		axios
			.post("/api/v1/recipient/edit", dataToSubmit)
			.then((resp) => {
				dispatch(fetchRecipients(resp?.data?.recipients));
				message.success(resp?.data?.message);

				setEditRecipientModalOpen(false);
			})
			.catch((err) => {
				message.error(err?.response?.data?.message);
			});
	};

	return (
		<>
			<Button
				type="primary"
				onClick={() => setEditRecipientModalOpen(true)}
				icon={<EditOutlined />}
			></Button>
			<Modal
				title="Edit Recipients"
				centered
				open={editRecipientModalOpen}
				onOk={() => editRecipient(form.getFieldValue())}
				onCancel={() => setEditRecipientModalOpen(false)}
				okText={"Save"}
			>
				<Form
					layout="vertical"
					form={form}
					style={{
						maxWidth: 600,
					}}
					initialValues={{
						first_name: recipientData.first_name,
						last_name: recipientData.last_name,
						email: recipientData.email,
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
				</Form>
			</Modal>
		</>
	);
}

export default HandleEditRecipient;
