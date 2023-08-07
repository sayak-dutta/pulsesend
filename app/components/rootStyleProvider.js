"use client";
import { useServerInsertedHTML } from "next/navigation";
import React, { Children, useState } from "react";
import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";

function RootStyleProvider({ children }) {
	const [cache] = useState(() => createCache());
	useServerInsertedHTML(() => (
		<script dangerouslySetInnerHTML={{ __html: `</script>${extractStyle(cache)}` }} />
	));
	return <StyleProvider cache={cache}>{children}</StyleProvider>;
}

export default RootStyleProvider;
