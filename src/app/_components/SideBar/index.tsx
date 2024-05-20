import { fetchSideBarConversation } from "@/actions/fetch-sidebar-conversation";
import { getServerSession } from "next-auth/next";
import SideBarConversation from "./SideBarConversation";
import SideBarHeader from "./SideBarHeader";
import SideBarUser from "./SideBarUser";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { authOptions } from "@/lib/auth";

const SideBar = async () => {
	const queryClient = new QueryClient();

	const session = await getServerSession(authOptions);

	await queryClient.prefetchQuery({
		queryKey: ["sideBarConversation", session?.user?.email],
		queryFn: () => fetchSideBarConversation(session?.user?.email),
	});

	return (
		<div className="hidden shrink-0 overflow-x-hidden bg-token-sidebar-surface-primary md:block">
			<div className="h-full w-[260px]">
				<div className="flex h-full min-h-0 flex-col">
					<div className="flex h-full min-h-0 flex-col">
						<div className="relative size-full flex-1 items-start border-white/20">
							<nav className="flex size-full flex-col px-3 pb-3.5">
								<SideBarHeader />
								<HydrationBoundary state={dehydrate(queryClient)}>
									<SideBarConversation />
								</HydrationBoundary>
								<SideBarUser />
							</nav>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SideBar;
