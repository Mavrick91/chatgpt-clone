"use client";

import { signOut, useSession } from "next-auth/react";

const SideBarUser = () => {
	const { data: session } = useSession();

	return (
		<div className="flex flex-col py-2 empty:hidden dark:border-white/20">
			<div className="flex w-full items-center">
				<div className="max-w-full grow">
					<div className="group relative" data-headlessui-state="">
						<button
							className="group-ui-open:bg-token-sidebar-surface-secondary flex w-full max-w-full items-center gap-2 rounded-lg p-2  text-sm hover:bg-token-sidebar-surface-secondary"
							type="button"
							aria-haspopup="true"
							aria-expanded="false"
							data-headlessui-state=""
							onClick={() => signOut()}
						>
							<div className="shrink-0">
								<div className="flex items-center justify-center overflow-hidden rounded-full">
									<div className="relative flex">
										{/* eslint-disable-next-line @next/next/no-img-element */}
										<img
											alt="User"
											referrerPolicy="no-referrer"
											loading="lazy"
											width="32"
											height="32"
											decoding="async"
											data-nimg="1"
											className="rounded-sm"
											src={session?.user?.image!}
										/>
									</div>
								</div>
							</div>
							<div className="relative -top-px grow -space-y-px truncate text-left text-token-text-primary">
								<div>{session?.user?.name}</div>
							</div>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SideBarUser;
