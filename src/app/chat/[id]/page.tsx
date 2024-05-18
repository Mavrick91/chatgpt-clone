"use client";

import FormInput from "@/components/FormInput";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import ChatMessages from "./_components/ChatMessages";
import { useEffect } from "react";

const Chat = ({ params }: NextPageProps) => {
	const queryClient = useQueryClient();
	const chatId = params.id;
	const { data: session } = useSession();
	const { data: conversations } = useQuery<SideBarConversation[]>({
		queryKey: ["sideBarConversation", session?.user?.email],
	});
	const { data: firstMessage } = useQuery<SideBarConversation>({
		queryKey: ["first-message"],
	});

	let conversation = conversations?.find((conversation) => conversation.id === chatId);

	if (firstMessage && !conversation) {
		conversation = firstMessage;
	}

	useEffect(() => {
		queryClient.setQueryData(["first-message"], null);
	}, [queryClient]);

	return (
		<div className="relative flex h-full flex-col">
			<div className="flex h-0 grow flex-col items-center justify-center text-token-text-primary">
				{conversation?.messages.length ? <ChatMessages conversation={conversation} /> : null}
			</div>
			<FormInput chatId={chatId} />
		</div>
	);
};

export default Chat;
