import Client from "../components/useClientLayout";
import Sidebar from "../widgets/sidebar";

export const metadata = {
	title: "Dashboard - PulseSend",
	// description: "",
};

function layout({ children }) {
	return <Client children={children} />;
}

export default layout;
