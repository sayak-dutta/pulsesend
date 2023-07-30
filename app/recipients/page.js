"use client";
import React, { useState } from "react";
import {
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
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

const columns = [
	{
		title: "Name",
		dataIndex: "name",
	},
	{
		title: "Email",
		dataIndex: "email",
	},
	{
		title: "Address",
		dataIndex: "address",
	},
];
const data = [];
for (let i = 0; i < 10; i++) {
	data.push({
		key: i,
		name: `Edward King ${i}`,
		email: `john@example.com`,
		address: `London, Park Lane no. ${i}`,
	});
}

const confirm = (e) => {
	console.log(e);
	message.success("Click on Yes");
};

function page() {
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);

	const onSelectChange = (newSelectedRowKeys) => {
		console.log("selectedRowKeys changed: ", newSelectedRowKeys);
		setSelectedRowKeys(newSelectedRowKeys);
	};
	const rowSelection = {
		selectedRowKeys,
		onChange: onSelectChange,
	};
	const hasSelected = selectedRowKeys.length > 0;

	return (
		<div style={{ padding: 24, minHeight: 360, background: "#fff" }}>
			{data.length < 1 ? (
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
									image={<Image src={"/no-data.png"} width={200} height={200} />}
									imageStyle={{ height: 200 }}
								/>
							</Col>
							<Col span={8} className="mx-auto">
								<Space>
									<Button type="primary" size="large" icon={<PlusOutlined />}>
										Add Recipient
									</Button>
									<Link href={"recipients/bulk-upload"}>
										<Button size="large">Bulk Upload</Button>
									</Link>
								</Space>
							</Col>
						</Row>

						<span
							style={{
								marginLeft: 8,
							}}
						>
							{hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
						</span>
					</div>
					{/* <Table rowSelection={rowSelection} columns={columns} dataSource={data} /> */}
				</div>
			) : (
				<div>
					<div
						style={{
							marginBottom: 16,
						}}
					>
						<Row justify={"space-between"}>
							<Popconfirm
								title="Delete the Recipient(s)"
								description="Are you sure?
						This action is irreversible"
								onConfirm={confirm}
								okText="Yes"
								cancelText="No"
							>
								<Button danger disabled={!hasSelected} icon={<DeleteOutlined />}>
									Delete
								</Button>
							</Popconfirm>
							<Space>
								<Button type="primary" icon={<PlusOutlined />}>
									Add Recipient
								</Button>
								<Link href={"recipients/bulk-upload"}>
									<Button>Bulk Upload</Button>
								</Link>
							</Space>
						</Row>

						<span
							style={{
								marginLeft: 8,
							}}
						>
							{hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
						</span>
					</div>
					<Table rowSelection={rowSelection} columns={columns} dataSource={data} />
				</div>
			)}
		</div>
	);
}

export default page;
