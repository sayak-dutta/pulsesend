"use client";

import React, { useState } from "react";
import { InboxOutlined, PlusOutlined } from "@ant-design/icons";
import Papa from "papaparse";
import { Table, Upload, Button, message, Card, Divider, Space } from "antd";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchRecipients } from "@/src/redux/slice/recipientSlice";
import { useSession } from "next-auth/react";
const { Dragger } = Upload;

function page() {
	const [data, setData] = useState([]);
	const [columns, setColumns] = useState([]);
	const router = useRouter();
	const dispatch = useDispatch();
	const session = useSession();

	const props = {
		accept: ".csv",
		// beforeUpload: (file) => {
		// 	const isPNG = file.type === "csv";
		// 	if (!isPNG) {
		// 		message.error(`${file.name} is not a CSV file`);
		// 	}
		// 	return isPNG || Upload.LIST_IGNORE;
		// },
		name: "file",
		multiple: true,
		onChange(recipient) {
			const { status } = recipient.file;
			if (status !== "uploading") {
				console.log(recipient.file, recipient.fileList);
			}
			if (status === "done") {
				console.log(recipient.file.originFileObj);
				Papa.parse(recipient.file.originFileObj, {
					header: false,

					complete: (results) => {
						console.log(results.data);
						setData(results.data);
						setColumns(
							Object.keys(results.data[0]).map((key) => ({
								title: key,
								dataIndex: key,
							}))
						);
					},
				});
				message.success(`${recipient.file.name} file uploaded successfully.`);
			} else if (status === "error") {
				message.error(`${recipient.file.name} file upload failed.`);
			}
		},

		progress: {
			strokeColor: {
				"0%": "#108ee9",
				"100%": "#87d068",
			},
			strokeWidth: 3,
			format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
		},
		action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
	};

	const bulkAddRecipient = () => {
		let bulkData = data.map((row) => {
			return {
				first_name: row[0],
				last_name: row[1],
				email: row[2],
				sender: session?.data?.user?.id,
			};
		});

		axios
			.post("/api/v1/recipient/bulk-add", bulkData)
			.then((resp) => {
				message.success(resp?.data?.message);
				dispatch(fetchRecipients(session?.data?.user?.id));
				router.replace("/recipients");
			})
			.catch((err) => message.error(err.message));
	};

	return (
		<Card style={{ padding: 24, minHeight: 360 }}>
			<Dragger {...props} onRemove={() => setColumns([])}>
				<p className="ant-upload-drag-icon">
					<InboxOutlined />
				</p>
				<p className="ant-upload-text">Click or drag CSV file to this area to upload</p>
				<p className="ant-upload-hint">
					Upload files with first_name, last name and email.
				</p>
			</Dragger>

			{columns.length > 1 ? (
				<Space direction="vertical" size="middle" style={{ display: "flex" }}>
					<Divider />
					<Button
						type="primary"
						onClick={() => bulkAddRecipient()}
						icon={<PlusOutlined />}
					>
						Add All Recipients
					</Button>
					<Table dataSource={data} columns={columns} showHeader={false} />
				</Space>
			) : (
				""
			)}
		</Card>
	);
}

export default page;
