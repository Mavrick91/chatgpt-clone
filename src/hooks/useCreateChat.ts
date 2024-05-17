"use client";

import { useCallback } from "react";
import { useSession } from "next-auth/react";
import { db } from "@/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";

export const useCreateChat = () => {
	const router = useRouter();
	const { data: session } = useSession();

	const createNewChat = useCallback(async () => {
		if (!session?.user?.email) {
			console.error("User email is not available.");
			return;
		}

		try {
			const doc = await addDoc(collection(db, "users", session.user.email, "chats"), {
				userId: session.user.email,
				createdAt: serverTimestamp(),
				messages: [],
			});

			router.push(`/chat/${doc.id}`);
		} catch (error) {
			console.error("Failed to create a new chat:", error);
		}
	}, [router, session?.user?.email]);

	return createNewChat;
};