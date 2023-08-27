"use client";

import React, { useRef } from "react";
import EmailEditor from "react-email-editor";

function page() {
	const emailEditorRef = useRef(null);

	const exportHtml = () => {
		emailEditorRef.current.editor.exportHtml((data) => {
			const { design, html } = data;
			console.log("exportHtml", html);
		});
	};
	const saveDesign = () => {
		emailEditorRef.current.editor.saveDesign((data) => {
			const { design, html } = data;
			console.log("exportHtml", design);
		});
	};


	return (
		<div>
			<button onClick={saveDesign}>Save Design</button>
		
			<EmailEditor ref={emailEditorRef} projectId={180529} />
		</div>
	);
}

export default page;
