import { db } from "@/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useCallback } from "react";
import { useUpdateConversation } from "./useUpdateConversation";

export const useSendMessage = () => {
	const { data: session } = useSession();
	const updateConversation = useUpdateConversation();

	const sendMessage = useCallback(
		async (chatId: string, message: Message) => {
			updateConversation(chatId, message);

			await addDoc(collection(db, "users", session?.user?.email!, "chats", chatId, "messages"), message);
		},
		[session?.user?.email, updateConversation]
	);

	return sendMessage;
};
