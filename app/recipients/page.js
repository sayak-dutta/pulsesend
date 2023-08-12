"use client";
import React, { useEffect, useState } from "react";
import {
	Alert,
	Button,
	Col,
	Empty,
	Layout,
	Popconfirm,
	Row,
	Space,
	Table,
	Typography,
	message,
} from "antd";
import Sidebar from "../widgets/sidebar";
import { Content, Footer } from "antd/es/layout/layout";
import { DeleteOutlined, EditOutlined, FileAddOutlined, PlusOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import UploadRecipientModal from "../components/uploadRecipientModal";
import axios from "axios";

const columns = [
	{
		title: "First Name",
		dataIndex: "first_name",
	},
	{
		title: "Last Name",
		dataIndex: "last_name",
	},
	{
		title: "Email",
		dataIndex: "email",
	},
	{
		title: "Actions",
		dataIndex: "action",
		render: (_, record) => (
			<>
				{" "}
				<Button type="primary" icon={<EditOutlined />}></Button>{" "}
				<Popconfirm
					title="Delete the Recipient"
					description={
						<>
							Are you sure? <br /> This action is irreversible
						</>
					}
					onConfirm={confirm}
					okText="Yes"
					cancelText="No"
				>
					<Button danger icon={<DeleteOutlined />}></Button>
				</Popconfirm>
			</>
		),
	},
];

const confirm = (e) => {
	console.log(e);
	message.success("Click on Yes");
};

function page() {
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const [recipientModalOpen, setRecipientModalOpen] = useState(false);
	const [recipients, setRecipients] = useState([]);

	const onSelectChange = (newSelectedRowKeys) => {
		console.log("selectedRowKeys changed: ", newSelectedRowKeys);
		setSelectedRowKeys(newSelectedRowKeys);
	};

	useEffect(async () => {
		let data = await axios.get("api/v1/recipient/list/all");

		setRecipients(data.data.recipients);
	}, []);
	const rowSelection = {
		selectedRowKeys,
		onChange: onSelectChange,
	};
	const hasSelected = selectedRowKeys.length > 0;

	return (
		<>
			{recipients.length < 1 ? (
				<div>
					<div
						style={{
							marginBottom: 16,
						}}
					>
						<Row align={"center"}>
							<Col span={24}>
								<Empty
									description="No Recipients Found"
									image={
										<Image
											src={"/no-data.png"}
											alt="no-data"
											width={200}
											height={200}
										/>
									}
									imageStyle={{ height: 200 }}
								/>
							</Col>
							<Col span={8} className="d-flex justify-content-center">
								<Space align="center">
									<Button
										type="primary"
										icon={<PlusOutlined />}
										onClick={() => setRecipientModalOpen(true)}
									>
										Add Recipient
									</Button>
									<UploadRecipientModal
										recipientModalOpen={recipientModalOpen}
										setRecipientModalOpen={setRecipientModalOpen}
									/>
									<Link href={"recipients/bulk-upload"}>
										<Button icon={<FileAddOutlined />}>Bulk Upload</Button>
									</Link>
								</Space>
							</Col>
						</Row>
					</div>
				</div>
			) : (
				<div>
					<div
						style={{
							marginBottom: 16,
						}}
					>
						<Row justify={"space-between"}>
							<Space>
								<Popconfirm
									title="Delete the Recipient(s)"
									description="Are you sure?
						This action is irreversible"
									onConfirm={confirm}
									okText="Yes"
									cancelText="No"
									disabled={!hasSelected}
								>
									<Button
										danger
										disabled={!hasSelected}
										icon={<DeleteOutlined />}
									>
										Delete
									</Button>
								</Popconfirm>
								<span
									style={{
										marginLeft: 8,
										color: "#000",
									}}
								>
									{hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
								</span>
							</Space>
							<Space>
								<Button type="primary" icon={<PlusOutlined />}>
									Add Recipient
								</Button>
								<Link href={"recipients/bulk-upload"}>
									<Button icon={<FileAddOutlined />}>Bulk Upload</Button>
								</Link>
							</Space>
						</Row>
					</div>
					<Table rowSelection={rowSelection} columns={columns} dataSource={recipients} />
				</div>
			)}
		</>
	);
}

export default page;
