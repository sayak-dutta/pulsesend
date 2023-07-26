"use client";
import { Button, Modal } from "antd";
import React, { useState } from "react";

const content = <></>;

function WaitlistConfirmationModal(props) {
	return (
		<>
			<Modal
				title="Thank You for Subscribing!"
				centered
				open={props.modalOpen}
				// onOk={() => setModal2Open(false)}
				// onCancel={() => setModal2Open(false)}
				width={300}
				footer={null}
				closable={false}
			>
				We'll notify you as soon we are live.
				<img src="/subscribed.gif" alt="" />
			</Modal>
		</>
	);
}

export default WaitlistConfirmationModal;
