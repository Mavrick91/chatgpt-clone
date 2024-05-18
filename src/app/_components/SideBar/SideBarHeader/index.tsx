"use client";

import NewIcon from "@/components/svg/NewIcon";
import { useRouter } from "next/navigation";

const SideBarHeader = () => {
	const router = useRouter();

	return (
		<div className="flex h-14 items-center justify-end">
			<button
				onClick={() => router.push("/")}
				className="h-10 rounded-lg px-2.5 text-token-text-secondary hover:bg-token-sidebar-surface-secondary focus-visible:bg-token-sidebar-surface-secondary focus-visible:outline-0"
			>
				<NewIcon className="icon-xl-heavy" />
			</button>
		</div>
	);
};

export default SideBarHeader;
