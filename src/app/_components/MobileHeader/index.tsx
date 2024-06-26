"use client";

import { AnimatePresence } from "framer-motion";
import ModelChoice from "@/components/ModelChoice";
import MenuIcon from "@/components/svg/MenuIcon";
import NewIcon from "@/components/svg/NewIcon";
import useClickOutside from "@/hooks/useClickOutside";
import { useRouter } from "next/navigation";
import MobileConversations from "./components/MobileConversations";

const MobileHeader = () => {
	const router = useRouter();
	const { isDropdownOpen, toggleDropdown, dropdownRef } = useClickOutside();

	return (
		<>
			<div className="sticky top-0 z-10 flex min-h-[60px] items-center justify-center border-b border-transparent bg-token-main-surface-primary pl-1 md:hidden">
				<button
					type="button"
					onClick={toggleDropdown}
					className="absolute inset-y-0 left-0 inline-flex items-center justify-center rounded-md px-3 hover:text-token-text-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white active:opacity-50"
				>
					<span className="sr-only">Open sidebar</span>
					<MenuIcon />
				</button>

				<ModelChoice isMobile />

				<div className="absolute inset-y-0 right-0 flex items-center">
					<button type="button" className="px-3" onClick={() => router.push("/")}>
						<NewIcon className="icon-lg mx-2.5 text-token-text-secondary" />
					</button>
				</div>
			</div>

			<AnimatePresence>{isDropdownOpen && <MobileConversations ref={dropdownRef} toggleDropdown={toggleDropdown} />}</AnimatePresence>
		</>
	);
};

export default MobileHeader;
