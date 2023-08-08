"use client";

import {
	EyeOutlined,
	GithubOutlined,
	GoogleCircleFilled,
	GoogleOutlined,
	LogoutOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { Button, Divider, Input, Typography } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getSession, signIn, signOut } from "next-auth/react";
import { sendAdminMail } from "@/utils/mailer";

function Page() {
	const [passwordVisible, setPasswordVisible] = React.useState(false);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [usersResults, setUsersResults] = useState([]);
	useEffect(() => {
		getSession().then((e) => {
			console.log(e);
		});
	}, []);
	const normalLogin = () => {
		signIn("credentials", { email, password, redirect: false }).then((e) => {
			console.log(e);
		});
	};

	// Use this function in your client-side code
	const githubLogin = () =>
		signIn("GithubProvider", { redirect: false, callbackUrl: "https://pulsesend.com" }).then(
			(e) => {
				console.log(e);
			}
		);

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
					onChange={(e) => setPassword(e.target.value)}
					visibilityToggle={{
						visible: passwordVisible,
						onVisibleChange: setPasswordVisible,
					}}
				/>
				<Button className="mt-3" size="large" type="primary" onClick={() => normalLogin()}>
					Login
				</Button>
				<Divider plain>OR</Divider>
				<Button
					size="large"
					icon={<GoogleOutlined />}
					onClick={() =>
						signIn("google", {
							redirect: true,
							callbackUrl: "https://pulsesend.com/api/auth/callback/google",
						})
					}
				>
					Login with Google
				</Button>
				{/* <Button
					icon={<GithubOutlined />}
					size="large"
					onClick={() => sendAdminMail(email, "530203")}
				>
					Login with github
				</Button> */}
				<Button icon={<LogoutOutlined />} size="large" onClick={() => signOut()}>
					Log out
				</Button>

				<Typography className="m-auto">
					Don't have an account? <Link href="">Sign-Up</Link>
				</Typography>
			</div>
		</div>
	);
}

export default Page;
