import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Row, Col, Space, Typography, Input } from "antd";
import { ArrowRightOutlined, CheckOutlined } from "@ant-design/icons";
import WaitlistConfirmationModal from "./waitlistConfirmationModal";
import ToastContainerCustom from "./toastContainerCustom";
import { toast } from "react-toastify";

const HeroSection = () => {
	const [waitlistEmail, setWaitlistEmail] = useState("");

	const [modalOpen, setModalOpen] = useState(false);
	useEffect(() => {
		// When the modal is opened, start the timer to close it after 3 seconds
		if (modalOpen) {
			setModalOpen(true);
			const timer = setTimeout(() => {
				setModalOpen(false);
			}, 3000);

			return () => clearTimeout(timer); // Clear the timer if the component unmounts
		}
	}, [modalOpen]);

	async function saveEmail() {
		try {
			const response = await fetch("/api/v1/waitlist/add", {
				method: "POST",
				// headers: {
				// 	"Content-Type": "application/json",
				// },
				body: JSON.stringify({ email: waitlistEmail }),
			});

			const data = await response.json();

			setModalOpen(true);
			return data;
		} catch (error) {
			toast.error("Something went wrong");
			return { error: "Error saving email" };
		}
	}

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { duration: 0.5, staggerChildren: 0.2, delayChildren: 0.4 },
		},
	};

	const childVariants = {
		hidden: { opacity: 0, y: 50 },
		visible: { opacity: 1, y: 0 },
	};

	const imgVariants = {
		hidden: { opacity: 0, scale: 0.8, x: 60 },
		visible: { opacity: 1, scale: 1, x: 0 },
	};

	return (
		<motion.div
			className="container"
			initial="hidden"
			animate="visible"
			variants={containerVariants}
		>
			<ToastContainerCustom />
			<Row justify={"center"} align={"middle"}>
				<Col xs={24} sm={24} md={12} lg={12} xl={12}>
					<Space className="d-grid">
						<motion.div variants={childVariants}>
							<Typography.Text className="hero-tagline">
								Unleash Your Email{" "}
								<span className="tagline-shadow-blue">Marketing</span> Potential
								<br /> Absolutely{" "}
								<span className="tagline-shadow-yellow">Free!</span>
							</Typography.Text>
						</motion.div>
						<motion.div variants={childVariants}>
							<Input
								placeholder="Your E-mail"
								name="waitlist-email"
								type="email"
								onChange={(e) => setWaitlistEmail(e.target.value)}
								// enterButton="Search"
								size="medium"
								className="hero-mail-input rounded-5 "
								suffix={
									<div className="rounded-5 bg-main" onClick={() => saveEmail()}>
										<ArrowRightOutlined className="submit-btn" />
									</div>
								}
								// onSearch={onSearch} // Uncomment if you have the onSearch function
							/>
							<WaitlistConfirmationModal
								modalOpen={modalOpen}
								message={"resp.message"}
							/>
						</motion.div>
						<motion.div variants={childVariants}>
							<Typography>
								<Space>
									<CheckOutlined />
									Know when we launch <CheckOutlined />
									Zero spam guarantee <CheckOutlined />
									Cancel Anytime
								</Space>
							</Typography>
						</motion.div>
					</Space>
				</Col>
				<Col xs={24} sm={24} md={12} lg={12} xl={12}>
					<motion.img
						src="./supermail.png"
						alt=""
						className="w-100 p-3"
						variants={imgVariants}
					/>
				</Col>
			</Row>
		</motion.div>
	);
};

export default HeroSection;
