import React from "react";

function Loader() {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh",
				backgroundColor: "#f0f2f5", // Set the background color of the loader
			}}
		>
			<script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.js"></script>

			<dotlottie-player
				src="https://lottie.host/d200b5a6-21e3-4e52-87c1-11f35bc5e9f1/1ZFWqBtbAX.lottie"
				background="transparent"
				speed="1"
				style={{ width: "200px", height: "200px" }}
				loop
				autoplay
			></dotlottie-player>

			
		</div>
	);
}

export default Loader;
