import Login from "@/components/Login";
import { SessionProvider } from "@/providers/SessionProvider";
import ThemeProvider from "@/providers/ThemeProvider";
import { getServerSession } from "next-auth";
import React from "react";

const Providers = async ({ children }: { children: React.ReactNode }) => {
	const session = await getServerSession();

	return (
		<ThemeProvider>
			<SessionProvider session={session}>{!session ? <Login /> : children}</SessionProvider>
		</ThemeProvider>
	);
};

export default Providers;
