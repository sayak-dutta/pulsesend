"use client";

import { EyeOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Input, Typography } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

function Page() {
	const [passwordVisible, setPasswordVisible] = React.useState(false);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [usersResults, setUsersResults] = useState([]);

	// Use this function in your client-side code
	async function saveEmail(email) {
		try {
			const response = await fetch("/api/saveEmail", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email }),
			});

			const data = await response.json();
			console.log(data);
			return data;
		} catch (error) {
			console.error("Error saving email:", error);
			return { error: "Error saving email" };
		}
	}

	return (
		<div className="bg-blue full-height d-flex">
			<div className="auth-container rounded-3">
				<img
					src="/pulsesend.png"
					className="m-auto w-75 h-auto mb-3"
					width={100}
					height={100}
				/>
				<Input
					size="large"
					placeholder="Email"
					suffix={<UserOutlined />}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<Input.Password
					size="large"
					placeholder="Password"
					visibilityToggle={{
						visible: passwordVisible,
						onVisibleChange: setPasswordVisible,
					}}
				/>
				<Button
					className="mt-3"
					size="large"
					type="primary"
					onClick={() => {
						saveEmail(email);
					}}
				>
					Login
				</Button>

				<Typography className="m-auto">
					Don't have an account? <Link href="">Sign-Up</Link>
				</Typography>
			</div>
		</div>
	);
}

export default Page;
