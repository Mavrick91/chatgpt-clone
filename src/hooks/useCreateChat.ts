"use client";

import { db } from "@/firebase";
import { useQueryClient } from "@tanstack/react-query";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const useCreateChat = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: session } = useSession();

  const createNewChat = useCallback(async () => {
    if (!session?.user?.email) {
      console.error("User email is not available.");
      return;
    }

    try {
      const doc = await addDoc(
        collection(db, "users", session.user.email, "chats"),
        {
          userId: session.user.email,
          createdAt: serverTimestamp(),
          messages: [],
        }
      );

      queryClient.setQueryData(
        ["sideBarConversation", session.user.email],
        (oldData: SideBarConversation[] | undefined) => {
          if (!oldData) {
            return [
              {
                id: doc.id,
                userId: session?.user?.email,
                createdAt: serverTimestamp(),
                messages: [],
              },
            ];
          }

          return [
            ...oldData,
            {
              id: doc.id,
              userId: session?.user?.email,
              createdAt: serverTimestamp(),
              messages: [],
            },
          ];
        }
      );

      router.push(`/chat/${doc.id}`);

      return doc.id;
    } catch (error) {
      console.error("Failed to create a new chat:", error);
    }
  }, [queryClient, router, session?.user?.email]);

  return createNewChat;
};
