"use client";

import React, { useEffect, useState } from "react";
import Header from "./widgets/header";
import Typography from "antd/es/typography/Typography";
import Title from "antd/es/typography/Title";
import { Col, Input, Layout, Row, Space } from "antd";
import Search from "antd/es/input/Search";
import { ArrowRightOutlined, CheckOutlined, SearchOutlined } from "@ant-design/icons";
import WaitlistConfirmationModal from "./components/waitlistConfirmationModal";
import HeroSection from "./components/heroSection";

function Home() {
	const [waitlistEmail, setWaitlistEmail] = useState("");
	let resp = {};

	return (
		<Layout className="homepage">
			{/* <img src="./demo-landing.jpg" className="w-100" alt="" /> */}
			<Row justify={"center"}>
				<Col xl={6} sm={12} xs={12}>
					<img src="./pulsesend.png" alt="" className="my-3 d-flex mx-auto w-75" />
				</Col>
			</Row>

			<HeroSection />

			<Row justify={"center"} align={"middle"} className="container">
				<Col xs={{ span: 24 }} sm={{ span: 24 }} md={12} lg={12} xl={12}>
					<img src="./hero-section-2.png" alt="" className="w-100 p-3" />
				</Col>
				<Col xs={{ span: 24 }} sm={{ span: 24 }} md={12} lg={12} xl={12}>
					<Space className="d-grid">
						<Typography className="hero-tagline">
							Send More, Connect More, Achieve More
						</Typography>

						<Typography className="fs-6">
							At PulseSend, we believe in empowering businesses of all sizes with the
							tools they need to reach their audience effectively. Our free email
							sending application is designed to take your campaigns to new heights
							without costing you a dime. No hidden fees, no subscriptions—just pure,
							unlimited email sending power.
						</Typography>
					</Space>
				</Col>
			</Row>
		</Layout>
	);
}

export default Home;
