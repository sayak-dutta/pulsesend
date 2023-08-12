"use client";
import { Layout } from "antd";
import Sidebar from "../widgets/sidebar";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import Loader from "./loader";

function Client({ children }) {
	const [windowWidth, setWindowWidth] = useState(0);

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

	const marginLeft = windowWidth >= 768 ? 200 : 80; // Change 768 to your desired breakpoint

	return (
		<>
			<Layout style={{ minHeight: "100vh" }}>
				<Sidebar />
				<Layout style={{ marginLeft }}>
					<Content style={{ margin: "0 16px" }}>
						<div
							style={{
								padding: 24,
								minHeight: 360,
								height: "90vh",
								maxHeight: "90vh",
								background: "#fff",
							}}
						>
							{children}
						</div>
					</Content>
					<Footer style={{ textAlign: "center" }}>PulseSend ©2023</Footer>
				</Layout>
			</Layout>
		</>
	);
}

export default Client;
