import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "../Provider";
import MobileHeader from "./_components/MobileHeader";
import SideBar from "./_components/SideBar";
import DesktopHeader from "./_components/DesktopHeader";

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
							<MobileHeader />
							<main className="transition-width relative size-full flex-1 overflow-auto">
								<div role="presentation" tabIndex={0} className="flex h-full flex-col focus-visible:outline-0">
									<div className="flex flex-1 flex-col overflow-hidden">
										<DesktopHeader />
										{children}
									</div>
								</div>
							</main>
						</div>
					</div>
				</Providers>
			</body>
		</html>
	);
}
