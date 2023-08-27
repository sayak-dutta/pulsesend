"use client";
import React, { useEffect, useRef, useState } from "react";

import {
	Button,
	Card,
	Divider,
	Modal,
	Popconfirm,
	Radio,
	Row,
	Space,
	Typography,
	message,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutlined, EditOutlined, PlusOutlined, SendOutlined } from "@ant-design/icons";
import { useSession } from "next-auth/react";
import { fetchCampaigns } from "@/src/redux/slice/campaignSlice";
import axios from "axios";
import Link from "next/link";

function page() {
	const [open, setOpen] = useState(false);
	const [previewData, setPreviewData] = useState({
		campaign_name: "",
		content: "",
		campaign_id: "",
	});
	const [showCode, setShowCode] = useState(false);
	const session = useSession();
	const dispatch = useDispatch();
	const campaignData = useSelector((i) => i.campaign);

	useEffect(() => {
		if (session?.data?.user?.id) {
			dispatch(fetchCampaigns(session?.data?.user?.id));
		}
	}, [session]);

	const deleteCampaign = (campaignId) => {
		axios
			.post("/api/v1/campaign/delete", { _id: campaignId })
			.then((data) => {
				console.log(data);
				dispatch(fetchCampaigns(session?.data?.user?.id));
				message.success(data.data.message);
			})
			.catch((err) => {
				message.error(err?.response?.data?.message);
			});
	};

	const handlePreview = (campaign_name, content, campaign_id) => {
		setOpen(true);
		setPreviewData({
			campaign_name,
			content,
			campaign_id,
		});
	};

	return (
		<>
			<Row justify={"end"}>
				<Link href={"/campaigns/create"}>
					<Button type="primary" icon={<PlusOutlined />}>
						Create
					</Button>
				</Link>
			</Row>
			<Row className="mx-auto">
				{campaignData?.data.map((campaign) => (
					<Card
						title={campaign.campaign_name}
						hoverable
						className="mx-2"
						onClick={() =>
							handlePreview(
								campaign.campaign_name,
								campaign.content,
								campaign.campaign_id
							)
						}
						style={{ width: 300, marginTop: 16, height: "fit-content" }}
						actions={[
							<SendOutlined key="send" />,
							<EditOutlined key="edit" />,
							<Popconfirm
								title="Delete this Campaign"
								description="Are you sure?
						This action is irreversible"
								onConfirm={() => {
									deleteCampaign(campaign._id);
								}}
								okText="Yes"
								cancelText="No"
							>
								<DeleteOutlined
									key="delete"
									onClick={(e) => {
										e.stopPropagation();
									}}
								/>
							</Popconfirm>,
						]}
					>
						<Typography.Paragraph ellipsis={{ rows: 3 }}>
							{campaign.content}
						</Typography.Paragraph>
					</Card>
				))}
				<Modal
					width={"fit-content"}
					style={{ maxWidth: "800px" }}
					title={
						<Space size={40}>
							<Typography.Text style={{ fontSize: "1.2rem" }}>
								{previewData.campaign_name}
							</Typography.Text>
							<Radio.Group
								defaultValue="preview"
								buttonStyle="solid"
								onChange={() => setShowCode(!showCode)}
							>
								<Radio.Button value="preview">Preview</Radio.Button>
								<Radio.Button value="html">HTML</Radio.Button>
							</Radio.Group>
						</Space>
					}
					centered
					open={open}
					onCancel={() => setOpen(false)}
					footer={false}
					closable
				>
					<Divider />
					{showCode ? (
						<Typography.Paragraph code>{previewData.content}</Typography.Paragraph>
					) : (
						<div dangerouslySetInnerHTML={{ __html: previewData.content }} />
					)}
				</Modal>
			</Row>
		</>
	);
}

export default page;
