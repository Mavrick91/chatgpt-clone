import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./_components/Provider";

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
		<html lang="en">
			<body className={inter.className}>
				<Providers>
					<main>{children}</main>
				</Providers>
			</body>
		</html>
	);
}
