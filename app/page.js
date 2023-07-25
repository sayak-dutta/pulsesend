"use client";

import React, { useEffect } from "react";
import Header from "./widgets/header";
import Typography from "antd/es/typography/Typography";
import Title from "antd/es/typography/Title";
import { Col, Input, Layout, Row, Space } from "antd";
import Search from "antd/es/input/Search";
import { ArrowRightOutlined, CheckOutlined, SearchOutlined } from "@ant-design/icons";
import connectDB from "@/src/db";
import useDatabase from "@/src/db";

function Home() {
	const suffix = (
		<div className="rounded-5 bg-main">
			<ArrowRightOutlined className="submit-btn" />
		</div>
	);

	return (
		<Layout className="homepage">
			{/* <img src="./demo-landing.jpg" className="w-100" alt="" /> */}
			<Row justify={"center"}>
				<Col xl={6} sm={12} xs={12}>
					<img src="./pulsesend.png" alt="" className="my-3 d-flex mx-auto w-75" />
				</Col>
			</Row>

			<Row justify={"center"} align={"middle"} className="container">
				<Col xs={24} sm={24} md={12} lg={12} xl={12}>
					<Space className="d-grid">
						<Typography className=" hero-tagline">
							Unleash Your Email{" "}
							<span span className="tagline-shadow-blue">
								Marketing
							</span>{" "}
							Potential
							<br /> Absolutely <span className="tagline-shadow-yellow ">Free!</span>
						</Typography>
						<Input
							placeholder="Your E-mail"
							enterButton="Search"
							size="medium"
							className="hero-mail-input rounded-5 "
							suffix={suffix}
							// onSearch={onSearch}
						/>
						<Typography className="">
							<Space>
								<CheckOutlined />
								Know when we launch <CheckOutlined />
								Zero spam guarantee <CheckOutlined />
								Cancel Anytime
							</Space>
						</Typography>
					</Space>
				</Col>
				<Col xs={24} sm={24} md={12} lg={12} xl={12}>
					<img src="./hero-image.svg" alt="" className="w-100 p-3" />
				</Col>
			</Row>
			{/* <Row justify={"center"}>
				<Col xl={18} sm={12} xs={12}>
					<Typography align="center" className="hero-tagline">
						{" "}
						We're Coming Soon
					</Typography>
				</Col>
			</Row> */}
		</Layout>
	);
}

export default Home;
