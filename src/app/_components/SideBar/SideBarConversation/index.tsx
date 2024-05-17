"use client";

import { db } from "@/firebase";
import { collection, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import ChatRow from "./ChatRow";
import Spinner from "@/components/Spinner";

const SideBarConversation = () => {
	const { data: session } = useSession();

	const [chats, loading, error] = useCollection(session && query(collection(db, "users", session.user?.email!, "chats"), orderBy("createdAt", "asc")));

	return (
		<div className="-mr-2 flex-1 flex-col overflow-y-auto pr-2 transition-opacity duration-500">
			<div className="juice:mt-5 flex flex-col gap-2 pb-2 text-sm text-token-text-primary">
				{loading ? (
					<Spinner />
				) : (
					<ol>
						{chats?.docs.map((doc) => (
							<ChatRow key={doc.id} id={doc.id} />
						))}
					</ol>
				)}
			</div>
		</div>
	);
};

export default SideBarConversation;
