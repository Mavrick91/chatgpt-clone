"use client";

import CollapseIcon from "@/components/svg/CollapseIcon";
import NewIcon from "@/components/svg/NewIcon";
import { useCreateChat } from "@/hooks/useCreateChat";

const SideBarHeader = () => {
	const createNewChat = useCreateChat();

	return (
		<div className="flex h-14 items-center justify-between">
			<button className="h-10 rounded-lg px-2.5 text-token-text-secondary hover:bg-token-sidebar-surface-secondary focus-visible:bg-token-sidebar-surface-secondary focus-visible:outline-0">
				<CollapseIcon />
			</button>
			<button
				onClick={createNewChat}
				className="h-10 rounded-lg px-2.5 text-token-text-secondary hover:bg-token-sidebar-surface-secondary focus-visible:bg-token-sidebar-surface-secondary focus-visible:outline-0"
			>
				<NewIcon className="icon-xl-heavy" />
			</button>
		</div>
	);
};

export default SideBarHeader;
