"use client";
import React, { useState } from "react";
import { Button, Layout, Table } from "antd";
import Sidebar from "../../widgets/sidebar";
import { Content, Footer } from "antd/es/layout/layout";

const columns = [
	{
		title: "Name",
		dataIndex: "name",
	},
	{
		title: "Age",
		dataIndex: "age",
	},
	{
		title: "Address",
		dataIndex: "address",
	},
];
const data = [];
for (let i = 0; i < 46; i++) {
	data.push({
		key: i,
		name: `Edward King ${i}`,
		age: 32,
		address: `London, Park Lane no. ${i}`,
	});
}

function page() {
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const [loading, setLoading] = useState(false);
	const start = () => {
		setLoading(true);
		// ajax request after empty completing
		setTimeout(() => {
			setSelectedRowKeys([]);
			setLoading(false);
		}, 1000);
	};
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
		<Layout style={{ minHeight: "100vh", marginLeft: "25%" }}>
			{/* <Sidebar /> */}
			<Layout>
				<Content style={{ margin: "0 16px" }}>
					<div style={{ padding: 24, minHeight: 360, background: "#fff" }}>
						<div>
							<div
								style={{
									marginBottom: 16,
								}}
							>
								<Button
									type="primary"
									onClick={start}
									disabled={!hasSelected}
									loading={loading}
								>
									Reload
								</Button>
								<span
									style={{
										marginLeft: 8,
									}}
								>
									{hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
								</span>
							</div>
							<Table
								rowSelection={rowSelection}
								columns={columns}
								dataSource={data}
							/>
						</div>
					</div>
				</Content>
			</Layout>
			<Footer style={{ textAlign: "center" }}>PulseSend ©2023</Footer>
		</Layout>
	);
}

export default page;
