import { motion } from "framer-motion";
import SideBarConversation from "@/app/_components/SideBar/SideBarConversation";
import SideBarUser from "@/app/_components/SideBar/SideBarUser";
import MenuIcon from "@/components/svg/MenuIcon";
import NewIcon from "@/components/svg/NewIcon";
import { useRouter } from "next/navigation";
import { forwardRef, useCallback } from "react";

type Props = {
	toggleDropdown: () => void;
};

const MobileConversations = forwardRef<HTMLDivElement, Props>(({ toggleDropdown }, dropdownRef) => {
	const router = useRouter();

	const handleClickNew = useCallback(() => {
		toggleDropdown();
		router.push("/");
	}, [toggleDropdown, router]);

	return (
		<>
			<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-black/50 opacity-100 dark:bg-black/75" />
			<motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ stiffness: 100 }} className="fixed inset-0 z-50 flex">
				<div ref={dropdownRef} className="relative flex w-full max-w-xs translate-x-0 flex-col bg-token-sidebar-surface-primary px-3 pb-3.5">
					<div className="relative items-start border-white/20">
						<div className="flex h-14 items-center justify-between">
							<button
								onClick={toggleDropdown}
								className="h-10 rounded-lg text-token-text-secondary hover:bg-token-sidebar-surface-secondary focus-visible:bg-token-sidebar-surface-secondary focus-visible:outline-0"
							>
								<MenuIcon />
							</button>
							<button
								onClick={handleClickNew}
								className="h-10 rounded-lg px-2.5 text-token-text-secondary hover:bg-token-sidebar-surface-secondary focus-visible:bg-token-sidebar-surface-secondary focus-visible:outline-0"
							>
								<NewIcon />
							</button>
						</div>
					</div>
					<SideBarConversation callback={() => toggleDropdown()} />
					<SideBarUser />
				</div>
			</motion.div>
		</>
	);
});

MobileConversations.displayName = "MobileConversations";

export default MobileConversations;
