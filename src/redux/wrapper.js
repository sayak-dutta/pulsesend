"use client";
import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import { SessionProvider } from "next-auth/react";

function Wrapper({ children }) {
	return <SessionProvider><Provider store={store}>{children}</Provider></SessionProvider>;
}

export default Wrapper;
