import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "../Provider";
import Header from "./_components/Header";
import SideBar from "./_components/SideBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "ChatGPT Clone",
	description: "ChatGPT Clone",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="dark">
			<body className={inter.className}>
				<Providers>
					<div className="relative z-0 flex size-full overflow-hidden">
						<SideBar />
						<div className="relative flex h-full max-w-full flex-1 flex-col overflow-hidden">
							<Header />
							{children}
						</div>
					</div>
				</Providers>
			</body>
		</html>
	);
}
