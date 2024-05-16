import CollapseIcon from "@/components/svg/CollapseIcon";
import NewIcon from "@/components/svg/NewIcon";
import React from "react";

const SideBar = () => {
	return (
		<div className="hidden shrink-0 overflow-x-hidden bg-token-sidebar-surface-primary md:block">
			<div className="h-full w-[260px]">
				<div className="flex h-full min-h-0 flex-col">
					<div className="flex h-full min-h-0 flex-col">
						<div className="relative size-full flex-1 items-start border-white/20">
							<nav className="juice:pb-0 flex size-full flex-col px-3 pb-3.5">
								<div className="flex h-14 items-center justify-between">
									<button className="h-10 rounded-lg px-2.5 text-token-text-secondary hover:bg-token-sidebar-surface-secondary focus-visible:bg-token-sidebar-surface-secondary focus-visible:outline-0">
										<CollapseIcon />
									</button>
									<button className="h-10 rounded-lg px-2.5 text-token-text-secondary hover:bg-token-sidebar-surface-secondary focus-visible:bg-token-sidebar-surface-secondary focus-visible:outline-0">
										<NewIcon className="icon-xl-heavy" />
									</button>
								</div>
							</nav>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SideBar;
