"use client";
import React, { useState } from "react";

import { Breadcrumb, Layout } from "antd";
import Sidebar from "../widgets/sidebar";
const { Content, Footer } = Layout;

function page() {
	return (
		<>
			{/* <Layout style={{ minHeight: "100vh" }}> */}
				{/* <Sidebar /> */}
				<Layout>
					{/* <Header style={{ padding: 0, background: "#000" }} suffixCls=""/> */}
					<Content style={{ margin: "0 16px" }}>
						<div style={{ padding: 24, minHeight: 360, background: "#fff" }}>
							This is under development
						</div>
					</Content>
					<Footer style={{ textAlign: "center" }}>PulseSend ©2023</Footer>
				</Layout>
			{/* </Layout> */}
		</>
	);
}

export default page;
