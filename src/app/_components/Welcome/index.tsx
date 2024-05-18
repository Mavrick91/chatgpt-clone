"use client";

import ChatMessages from "@/app/chat/[id]/_components/ChatMessages";
import { useQuery } from "@tanstack/react-query";
import HomePageLogo from "../HomePageLogo";

const Welcome = () => {
	const { data: firstMessage } = useQuery<SideBarConversation>({
		queryKey: ["first-message"],
	});

	return firstMessage ? <ChatMessages conversation={firstMessage} /> : <HomePageLogo />;
};

export default Welcome;
