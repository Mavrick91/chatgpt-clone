import Login from "@/components/Login";
import ModelsProvider from "@/providers/ModelsProvider";
import { OpenAIProvider } from "@/providers/OpenAIProvider";
import QueryClientProvider from "@/providers/QueryClientProvider";
import SessionProvider from "@/providers/SessionProvider";
import ThemeProvider from "@/providers/ThemeProvider";
import ToastProvider from "@/providers/ToastProvider";

import { getServerSession } from "next-auth";

const Providers = async ({ children }: { children: React.ReactNode }) => {
	const session = await getServerSession();

	return (
		<ThemeProvider>
			<ToastProvider />
			<SessionProvider session={session}>
				{!session ? (
					<Login />
				) : (
					<QueryClientProvider>
						<OpenAIProvider>
							<ModelsProvider>{children}</ModelsProvider>
						</OpenAIProvider>
					</QueryClientProvider>
				)}
			</SessionProvider>
		</ThemeProvider>
	);
};

export default Providers;
