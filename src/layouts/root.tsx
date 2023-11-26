import { Roboto } from "next/font/google";
import "@/styles/globals.css";
import container from "@/styles/container.module.css";
import Navbar from "@/components/layout/NavBar";
import { AuthClient } from "@/http/auth.front";
import { useEffect, useState } from "react";
import Head from "next/head";

const roboto = Roboto({
	weight: ["300", "400", "500", "700"],
	style: ["normal", "italic"],
	subsets: ["latin"],
	display: "swap",
});

async function getAuthData() {
	return await AuthClient.getAuthInformation();
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	const [authData, setAuthData] = useState<IAuth>();

	useEffect(() => {
		async function fetchData() {
			setAuthData(await getAuthData());
		}

		fetchData();
	}, []);

	return (
		<div
			className={`${roboto.className} flex flex-col class-container min-w-screen min-h-screen`}>
			<Head>
				<title>{(children as any).props.pageName}</title>
			</Head>
			<Navbar authData={authData!} pageName={(children as any).props.pageName} />
			<div className={`${container["container-space"]} flex-1`}>
				{children}
			</div>
			<div className="bg-silver w-100 h-[87px]"></div>
		</div>
	);
};

export default RootLayout;
