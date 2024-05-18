import { db } from "@/firebase";
import { getDocs, collection, query, orderBy } from "firebase/firestore";

export const fetchSideBarConversation = async (email?: string | null) => {
	if (!email) {
		console.error("User email is not available.");
		return;
	}

	try {
		const chatsSnapshot = await getDocs(collection(db, "users", email, "chats"));

		const chats: SideBarConversation[] = await Promise.all(
			chatsSnapshot.docs.map(async (chatDoc) => {
				const messagesSnapshot = await getDocs(query(collection(chatDoc.ref, "messages"), orderBy("createdAt")));

				return {
					id: chatDoc.id,
					userId: email,
					createdAt: chatDoc.data().createdAt,
					messages: messagesSnapshot.docs.map((doc) => ({
						id: doc.id,
						text: doc.data().text,
						createdAt: doc.data().createdAt,
						user: doc.data().user,
					})),
				};
			})
		);

		return chats;
	} catch (error) {
		console.error("Failed to fetch chats:", error);
	}
};
