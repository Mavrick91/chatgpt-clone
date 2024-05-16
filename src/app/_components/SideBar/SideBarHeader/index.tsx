"use client";

import CollapseIcon from "@/components/svg/CollapseIcon";
import NewIcon from "@/components/svg/NewIcon";
import { db } from "@/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";

const SideBarHeader = () => {
	const router = useRouter();
	const { data: session } = useSession();

	const createNewChat = useCallback(async () => {
		const doc = await addDoc(collection(db, "users", session?.user?.email!, "chats"), {
			userId: session?.user?.email,
			createdAt: serverTimestamp(),
		});

		router.push(`/chat/${doc.id}`);
	}, [router, session?.user?.email]);

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
