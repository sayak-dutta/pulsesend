"use client";
import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Button, Card, Modal } from "antd";
import { useSelector } from "react-redux";

function page() {
	const settingsData = useSelector((i) => i.settings);
	const editorRef = useRef(null);
	const [open, setOpen] = useState(false);

	const log = () => {
		if (editorRef.current) {
			console.log(editorRef.current.getContent());
		}
	};
	return (
		<Card style={{ padding: 24 }}>
			<Editor
				apiKey="i4mmyd0tfzurc74005uu443obxd00owli2a2dqo10wd7kogw"
				onInit={(evt, editor) => (editorRef.current = editor)}
				initialValue="<p>This is the initial content of the editor.</p>"
				init={{
					skin: settingsData.darkTheme ? "oxide-dark" : undefined,
					content_css: settingsData.darkTheme ? "dark" : undefined,
					height: 400,
					menubar: false,
					plugins: [
						"advlist",
						"autolink",
						"lists",
						"link",
						"image",
						"charmap",
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
						"removeformat | help",
					content_style:
						"body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
				}}
			/>
			<Modal
				title="Preview"
				centered
				open={open}
				onOk={() => setOpen(false)}
				onCancel={() => setOpen(false)}
			>
				<div dangerouslySetInnerHTML={{ __html: editorRef?.current?.getContent() }} />
			</Modal>
			<Button onClick={() => setOpen(true)}>Log editor content</Button>
		</Card>
	);
}

export default page;
