"use client";
import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Button, Card, Form, Input, Modal, Radio, Space, Typography } from "antd";
import { useSelector } from "react-redux";
import Link from "next/link";
import { ArrowLeftOutlined, SaveFilled, SaveOutlined, SaveTwoTone } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";

function page() {
	const settingsData = useSelector((i) => i.settings);
	const editorRef = useRef(null);
	const [open, setOpen] = useState(false);
	let form = useForm();

	const onFinish = (values) => {
		console.log("Success:", values.campaign_name);
	};
	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};
	return (
		<Card style={{ padding: 24 }}>
			<Form
				name="basic"
				labelCol={{
					span: 8,
				}}
				initialValues={{
					remember: true,
				}}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="on"
				layout="vertical"
			>
				<Form.Item
					label="Campaign Name"
					name="campaign_name"
					rules={[
						{
							required: true,
							message: "Please enter campaign name",
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="Content"
					required
					rules={[
						{
							required: true,
							message: "Please enter campaign name",
						},
					]}
				>
					<Editor
						apiKey="i4mmyd0tfzurc74005uu443obxd00owli2a2dqo10wd7kogw"
						onInit={(evt, editor) => (editorRef.current = editor)}
						outputFormat="html"
						init={{
							skin: settingsData.darkTheme ? "oxide-dark" : undefined,
							content_css: settingsData.darkTheme ? "dark" : undefined,

							height: 400,
							menubar: true,
							plugins: [
								"advlist",
								"autolink",
								"lists",
								"link",
								"image",
								"charmap",
								"code",
								"preview",
								"anchor",
								"searchreplace",
								"visualblocks",
								"code",
								"fullscreen",
								"insertdatetime",
								"media",
								"table",
								"code",
								"help",
								"wordcount",
							],

							toolbar:
								"undo redo | blocks | " +
								"bold italic forecolor | alignleft aligncenter " +
								"alignright alignjustify | bullist numlist outdent indent | " +
								"removeformat | code | help",
							content_style:
								"body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
							style_formats: [
								{ title: "Paragraph", format: "p" },
								{ title: "Heading 1", format: "h1" },
								{ title: "Heading 2", format: "h2" },
								{ title: "Large text", format: "largetext" },
								{ title: "Button styles" },
								{ title: "Call-to-action", format: "calltoaction" },
							],
						}}
					/>
				</Form.Item>

				<Form.Item>
					<Space>
						<Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
							Save
						</Button>
						<Link href={"/campaigns"}>
							<Button icon={<ArrowLeftOutlined />}>Back</Button>
						</Link>
					</Space>
				</Form.Item>
			</Form>
		</Card>
	);
}

export default page;
