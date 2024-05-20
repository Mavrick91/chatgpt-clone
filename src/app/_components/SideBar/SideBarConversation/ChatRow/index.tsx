"use client";

import DeleteChatIcon from "@/components/svg/DeleteChatIcon";
import { db } from "@/firebase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import { doc, deleteDoc as firebaseDeleteDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

type Props = {
	id: string;
	displayMessage: string;
	callback?: () => void;
};

const ChatRow = ({ id, displayMessage, callback }: Props) => {
	const queryClient = useQueryClient();
	const pathname = usePathname();
	const router = useRouter();
	const { data: session } = useSession();
	const [active, setActive] = useState(false);

	const { mutate: deleteDoc } = useMutation<void, Error>({
		mutationFn: async () => {
			return firebaseDeleteDoc(doc(db, "users", session?.user?.email!, "chats", id));
		},
		onMutate() {
			if (active) router.replace("/");

			const currentData = queryClient.getQueryData(["sideBarConversation", session?.user?.email]) as SideBarConversation[];
			const updatedData = currentData.filter((conversation) => conversation.id !== id);

			queryClient.setQueryData(["sideBarConversation", session?.user?.email], updatedData);
			queryClient.setQueryData(["first-message"], null);
		},
	});

	const handleDelete = useCallback(() => {
		deleteDoc();
		if (callback) callback();
	}, [deleteDoc, callback]);

	const handleClickConversation = useCallback(() => {
		if (callback) callback();
		router.push(`/chat/${id}`);
	}, [callback, router, id]);

	useEffect(() => {
		if (pathname.includes(id)) {
			setActive(true);
		} else {
			setActive(false);
		}
	}, [pathname, router, id]);

	return (
		<li className="relative mt-2">
			<div
				className={classNames("group relative rounded-lg hover:bg-token-sidebar-surface-secondary", {
					"bg-token-sidebar-surface-secondary opacity-90": active,
				})}
			>
				<button onClick={handleClickConversation} className="flex w-full items-center gap-2 p-2 text-left">
					<div className="relative grow overflow-hidden whitespace-nowrap">
						{displayMessage}
						<div
							className={classNames("absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-token-sidebar-surface-primary from-0% to-transparent group-hover:w-10", {
								"w-10 from-token-sidebar-surface-secondary from-60%": active,
								"group-hover:from-token-sidebar-surface-secondary group-hover:from-60%": true,
							})}
						></div>
					</div>
				</button>
				<div className={classNames("absolute inset-y-0 right-0 items-center gap-1.5 pr-2 group-hover:flex", { flex: active, hidden: !active })}>
					<button
						onClick={handleDelete}
						className="flex items-center justify-center text-token-text-secondary transition hover:text-red-500"
						aria-haspopup="menu"
						aria-expanded="false"
						data-state="closed"
					>
						<DeleteChatIcon />
					</button>
				</div>
			</div>
		</li>
	);
};

export default ChatRow;
