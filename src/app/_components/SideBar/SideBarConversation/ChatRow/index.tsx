import { db } from "@/firebase";
import { collection, deleteDoc, doc, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import classNames from "classnames";
import DeleteChatIcon from "@/components/svg/DeleteChatIcon";

type Props = {
	id: string;
};

const ChatRow = ({ id }: Props) => {
	const pathname = usePathname();
	const router = useRouter();
	const { data: session } = useSession();
	const [active, setActive] = useState(false);

	const [messages] = useCollection(collection(db, "users", session?.user?.email!, "chats", id, "messages"));

	useEffect(() => {
		if (pathname.includes(id)) {
			setActive(true);
		} else {
			setActive(false);
		}
	}, [pathname, router, id]);

	const handleClickDeleteChat = useCallback(() => {
		deleteDoc(doc(db, "users", session?.user?.email!, "chats", id));
		if (active) router.replace("/");
	}, [session?.user?.email, id, active, router]);

	return (
		<li className="relative mt-2">
			<div
				className={classNames("group relative rounded-lg hover:bg-token-sidebar-surface-secondary", {
					"bg-token-sidebar-surface-secondary opacity-90": active,
				})}
			>
				<Link href={`/chat/${id}`} className="flex items-center gap-2 p-2">
					<div className="relative grow overflow-hidden whitespace-nowrap">
						{messages?.docs.length ? messages.docs[0].data().text : "New chat"}
						<div
							className={classNames("absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-token-sidebar-surface-primary from-0% to-transparent group-hover:w-10", {
								"w-10 from-token-sidebar-surface-secondary from-60%": active,
								"group-hover:from-token-sidebar-surface-secondary group-hover:from-60%": true,
							})}
						></div>
					</div>
				</Link>
				<div className={classNames("absolute inset-y-0 right-0 items-center gap-1.5 pr-2 group-hover:flex", { flex: active, hidden: !active })}>
					<button
						onClick={handleClickDeleteChat}
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
