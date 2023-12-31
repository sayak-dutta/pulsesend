"use client";
import React, { useEffect, useState } from "react";
import {
	Alert,
	Button,
	Card,
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
import { useDispatch, useSelector } from "react-redux";
import HandleEditRecipient from "../components/handleEditRecipient";
import Loader from "../components/loader";
import { fetchRecipients } from "@/src/redux/slice/recipientSlice";
import { useSession } from "next-auth/react";

function page() {
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const [recipientModalOpen, setRecipientModalOpen] = useState(false);
	const [recipients, setRecipients] = useState([]);
	const recipientData = useSelector((i) => i.recipient);
	const dispatch = useDispatch();
	const session = useSession();

	const onSelectChange = (newSelectedRowKeys) => {
		setSelectedRowKeys(newSelectedRowKeys);
	};

	useEffect(() => {
		setRecipients(recipientData?.data?.map((o) => ({ ...o, key: o._id })));
	}, [recipientData]);
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
				dispatch(fetchRecipients(session?.data?.user?.id));
				message.success(resp?.data?.message);
				setSelectedRowKeys([]);
			})
			.catch((err) => message.error(err.message));
	};

	useEffect(() => {
		dispatch(fetchRecipients(session?.data?.user?.id));
	}, [1]);

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
				<Space>
					<HandleEditRecipient recipientData={record} />
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
				</Space>
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
				<Card
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
						<Col span={24} className="d-flex justify-content-center mt-3">
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
				</Card>
			) : (
				<Card>
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
								<Button danger disabled={!hasSelected} icon={<DeleteOutlined />}>
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

					<Table
						style={{ marginTop: ".5rem" }}
						rowSelection={rowSelection}
						columns={columns}
						dataSource={recipients}
						pagination={{ pageSize: 10 }}
						scroll={{ x: "max-content" }}
					/>
				</Card>
			)}
		</>
	);
}

export default page;
