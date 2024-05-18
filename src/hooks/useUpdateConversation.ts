import { useCallback } from "react";
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";

export const useUpdateConversation = () => {
	const queryClient = useQueryClient();
	const { data: session } = useSession();

	const updateQueryData = useCallback(
		(chatId: string, message: Message) => {
			queryClient.setQueryData(["sideBarConversation", session?.user?.email], (oldData: SideBarConversation[] | undefined) => {
				return oldData?.map((chat) => {
					if (chat.id === chatId) {
						return {
							...chat,
							messages: [...chat.messages, message],
						};
					}
					return chat;
				});
			});
		},
		[queryClient, session]
	);

	return updateQueryData;
};
