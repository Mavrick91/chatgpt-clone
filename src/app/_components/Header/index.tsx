import DropdownIcon from "@/components/svg/DropdownIcon";
import MenuIcon from "@/components/svg/MenuIcon";
import NewIcon from "@/components/svg/NewIcon";
import React from "react";

const Header = () => {
	return (
		<div className="sticky top-0 z-10 flex min-h-[40px] items-center justify-center border-b border-token-border-medium bg-token-main-surface-primary pl-1 md:hidden">
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
				className="group flex cursor-pointer items-center gap-1 overflow-hidden whitespace-nowrap rounded-xl px-3 py-2 text-lg font-medium hover:bg-token-main-surface-secondary"
			>
				<div>
					ChatGPT <span className="text-token-text-secondary">4o</span>
				</div>
				<DropdownIcon />
			</button>
			<div className="absolute inset-y-0 right-0 flex items-center">
				<button type="button" className="px-3">
					<NewIcon />
				</button>
			</div>
		</div>
	);
};

export default Header;
