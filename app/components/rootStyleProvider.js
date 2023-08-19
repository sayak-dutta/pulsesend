"use client";
import { useServerInsertedHTML } from "next/navigation";
import React, { Children, useState } from "react";
import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";
import { ConfigProvider, theme } from "antd";

function RootStyleProvider({ children }) {
	const [cache] = useState(() => createCache());
	useServerInsertedHTML(() => (
		<script dangerouslySetInnerHTML={{ __html: `</script>${extractStyle(cache)}` }} />
	));
	return (
		<StyleProvider cache={cache}>
			<ConfigProvider
				theme={{
					// 1. Use dark algorithm
					algorithm: theme.defaultAlgorithm,

					// 2. Combine dark algorithm and compact algorithm
					// algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
				}}
			>
				{" "}
				{children}
			</ConfigProvider>
		</StyleProvider>
	);
}

export default RootStyleProvider;
