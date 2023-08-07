import { LoginOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Col, Row, Space } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Header() {
	return (
		<>
			<nav
				class="navbar navbar-expand-lg bg-light border-bottom border-bottom-light "
				data-bs-theme="light"
			>
				<div class="container-fluid ">
					<Link href={"#"}>
						<img src="/pulsesend.png" alt="" className="logo-nav p-1" />
					</Link>
					<button
						class="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarColor01"
						aria-controls="navbarColor01"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span class="navbar-toggler-icon"></span>
					</button>
					<div class="collapse navbar-collapse" id="navbarColor01">
						<ul class="navbar-nav me-auto mb-2 mb-lg-0">
							<li class="nav-item">
								<a class="nav-link active" aria-current="page" href="#">
									Home
								</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" href="#">
									Recipients
								</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" href="#">
									Pricing
								</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" href="#">
									About
								</a>
							</li>
						</ul>
						<LogoutOutlined style={{ color: "#3972fc" }} />
					</div>
				</div>
			</nav>
		</>
	);
}

export default Header;
