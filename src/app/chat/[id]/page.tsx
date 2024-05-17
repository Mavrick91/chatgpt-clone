"use client";

import FormInput from "@/components/FormInput";
import ChatMessages from "./_components/ChatMessages";
import { useCollection } from "react-firebase-hooks/firestore";
import { useSession } from "next-auth/react";
import { db } from "@/firebase";
import { query, collection, orderBy } from "firebase/firestore";
import Spinner from "@/components/Spinner";
import HomePageLogo from "@/app/_components/HomePageLogo";

const Chat = ({ params }: NextPageProps) => {
	const chatId = params.id;
	const { data: session } = useSession();

	const [messages, loading] = useCollection(session && query(collection(db, "users", session?.user?.email!, "chats", chatId, "messages"), orderBy("createdAt")));

	const messagesArray = messages?.docs.map((message) => message.data());

	return (
		<div className="relative flex h-full flex-col">
			<div className="flex h-0 grow flex-col items-center justify-center text-token-text-primary">
				{loading ? <Spinner /> : messagesArray?.length ? <ChatMessages messages={messagesArray} /> : <HomePageLogo />}
			</div>
			<FormInput chatId={chatId} />
		</div>
	);
};

export default Chat;
