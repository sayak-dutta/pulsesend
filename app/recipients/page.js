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
	Skeleton,
	Space,
	Spin,
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
import { useSelector } from "react-redux";

function page() {
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const [recipientModalOpen, setRecipientModalOpen] = useState(false);
	const [recipients, setRecipients] = useState([]);

	const recipientData = useSelector((i) => i.recipient);

	const onSelectChange = (newSelectedRowKeys) => {
		console.log("selectedRowKeys changed: ", newSelectedRowKeys);
		setSelectedRowKeys(newSelectedRowKeys);
	};

	useEffect(() => {
		setRecipients(recipientData?.data?.map((o) => ({ ...o, key: o._id })));
	}, []);
	const rowSelection = {
		selectedRowKeys,
		onChange: onSelectChange,
	};

	const hasSelected = selectedRowKeys.length > 0;

	const deleteRecipient = (recipient_id) => {
		axios
			.post("/api/v1/recipient/delete", { recipient_id })
			.then((resp) => {
				console.log();
				setRecipients(resp?.data?.recipients?.map((o) => ({ ...o, key: o._id })));
				message.success(resp?.data?.message);
			})
			.catch((err) => message.error(err.message));
	};

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
						onConfirm={() => deleteRecipient(record._id)}
						okText="Yes"
						cancelText="No"
					>
						<Button danger icon={<DeleteOutlined />}></Button>
					</Popconfirm>
				</>
			),
		},
	];

	return (
		<>
			<UploadRecipientModal
				recipientModalOpen={recipientModalOpen}
				setRecipientModalOpen={setRecipientModalOpen}
			/>
			{recipients?.length < 1 ? (
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
									onConfirm={() => deleteRecipient(selectedRowKeys)}
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
								<Button
									type="primary"
									icon={<PlusOutlined />}
									onClick={() => setRecipientModalOpen(true)}
								>
									Add Recipient
								</Button>

								<Link href={"recipients/bulk-upload"}>
									<Button icon={<FileAddOutlined />}>Bulk Upload</Button>
								</Link>
							</Space>
						</Row>
					</div>
					<Table
						rowSelection={rowSelection}
						columns={columns}
						dataSource={recipients}
						pagination={{ pageSize: 6 }}
					/>
				</div>
			)}
		</>
	);
}

export default page;
