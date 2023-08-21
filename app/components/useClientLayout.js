"use client";
import { Breadcrumb, Button, Layout, Space, Switch, Tooltip, Typography } from "antd";
import Sidebar from "../widgets/sidebar";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import Loader from "./loader";
import { useDispatch, useSelector } from "react-redux";
import { withAuth } from "@/src/auth/useAuth";
import { signOut, useSession } from "next-auth/react";
import { fetchRecipients } from "@/src/redux/slice/recipientSlice";
import { BulbFilled, BulbOutlined, LogoutOutlined } from "@ant-design/icons";
import { changeTheme } from "@/src/redux/slice/settingSlice";

function Client({ children }) {
	const [windowWidth, setWindowWidth] = useState(0);
	const session = useSession();
	const dispatch = useDispatch();
	const settingsData = useSelector((i) => i.settings);

	useEffect(() => {
		// Function to update the window width
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		// Add event listener for window resize
		window.addEventListener("resize", handleResize);

		// Initial update of window width
		setWindowWidth(window.innerWidth);

		// Clean up the event listener on unmount
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);
	let marginLeft;
	marginLeft = windowWidth >= 768 ? 200 : 80; // Change 768 to your desired breakpoint

	const settignsData = useSelector((i) => i.settings);

	if (settignsData.siderCollapsed === false) {
		marginLeft = "200px";
	} else if (settignsData.siderCollapsed === undefined) {
		marginLeft = "200px";
	} else {
		marginLeft = "80px";
	}

	return (
		<>
			<Layout style={{ minHeight: "100vh" }}>
				<Sidebar />

				<Layout style={{ marginLeft }}>
					<Header
						style={{
							padding: 0,
							background: settingsData.darkTheme ? "black" : "white",
							display: "flex",
							alignItems: "center",
							justifyContent: "end",
							paddingRight: "2rem",
						}}
					>
						<Space>
							<Switch
								checkedChildren={<BulbOutlined />}
								unCheckedChildren={<BulbFilled />}
								onChange={() => dispatch(changeTheme(!settingsData.darkTheme))}
							/>
							<Typography.Text strong>
								Welcome, {session.data.user.name}
							</Typography.Text>

							<Tooltip title="Log Out">
								<Button icon={<LogoutOutlined />} onClick={() => signOut()} />
							</Tooltip>
						</Space>
					</Header>
					<Content style={{ margin: "0 16px" }}>
						<div
							style={{
								padding: 24,
								// minHeight: 360,
								// height: "90vh",
								// maxHeight: "90vh",
							}}
						>
							{children}
						</div>
					</Content>
					<Footer
						style={{
							textAlign: "center",
							background: settingsData.darkTheme ? "black" : "white",
						}}
					>
						<Typography.Text>PulseSend ©{new Date().getFullYear()}</Typography.Text>
					</Footer>
				</Layout>
			</Layout>
		</>
	);
}

export default withAuth(Client);
