import DropdownIcon from "@/components/svg/DropdownIcon";
import MenuIcon from "@/components/svg/MenuIcon";
import NewIcon from "@/components/svg/NewIcon";
import React from "react";

const Header = () => {
	return (
		<div className="sticky top-0 z-10 flex min-h-[60px] items-center justify-center border-b border-transparent bg-token-main-surface-primary pl-1 md:hidden">
			<button
				type="button"
				className="absolute inset-y-0 left-0 inline-flex items-center justify-center rounded-md px-3 hover:text-token-text-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white active:opacity-50"
			>
				<span className="sr-only">Open sidebar</span>
				<MenuIcon />
			</button>
			<button
				aria-haspopup="menu"
				aria-expanded="false"
				data-state="closed"
				className="group flex cursor-pointer items-center gap-1 overflow-hidden whitespace-nowrap rounded-lg px-3 py-1.5 text-lg font-medium text-token-text-secondary hover:bg-token-main-surface-secondary"
			>
				<div className="text-token-text-secondary">
					ChatGPT <span className="text-token-text-secondary">4o</span>
				</div>
				<DropdownIcon />
			</button>
			<div className="absolute inset-y-0 right-0 flex items-center">
				<button type="button" className="px-3">
					<NewIcon className="icon-lg mx-2.5 text-token-text-secondary" />
				</button>
			</div>
		</div>
	);
};

export default Header;
