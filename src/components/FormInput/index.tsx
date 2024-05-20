"use client";

import { askQuestion } from "@/actions/ask-question";
import AddFileIcon from "@/components/svg/AddFileIcon";
import ButtonSend from "@/components/svg/ButtonSend";
import { useCreateChat } from "@/hooks/useCreateChat";
import { useSendMessage } from "@/hooks/useSendMessage";
import { useUpdateConversation } from "@/hooks/useUpdateConversation";
import { useModels } from "@/providers/ModelsProvider";
import { useQueryClient } from "@tanstack/react-query";
import { serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type FormData = {
	message: string;
};

type Props = {
	chatId?: string;
};

const FormInput = ({ chatId }: Props) => {
	const { data: session } = useSession();
	const { defaultModel } = useModels();
	const createNewChat = useCreateChat();
	const sendMessage = useSendMessage();
	const updateConversation = useUpdateConversation();
	const queryClient = useQueryClient();

	const { watch, handleSubmit, register, reset } = useForm<FormData>();

	const watchMessage = watch("message");

	const adjustTextAreaHeight = useCallback(() => {
		const textarea = document.getElementById("prompt-textarea") as HTMLTextAreaElement;
		if (textarea) {
			textarea.style.height = "auto";
			textarea.style.height = `${textarea.scrollHeight}px`;
		}
	}, []);

	useEffect(() => {
		adjustTextAreaHeight();
	}, [watchMessage, adjustTextAreaHeight]);

	const onSubmit = useCallback(
		async (formData: FormData) => {
			if (!session) {
				toast.error("You must be logged in to send a message.");
				return;
			}

			const notificationId = toast.loading("ChatGPT is thinking...");

			try {
				reset();

				const messageContent = formData.message.trim();

				const message: Message = {
					text: messageContent,
					createdAt: serverTimestamp(),
					user: {
						_id: session.user?.email!,
						name: session.user?.name!,
						avatar: session.user?.image!,
					},
				};

				let newChatId: string | undefined;

				if (!chatId) {
					queryClient.setQueryData(["first-message"], {
						userId: session.user?.email!,
						createdAt: serverTimestamp(),
						messages: [{ id: "1", ...message }],
					});

					newChatId = await createNewChat();
				}

				if (chatId || newChatId) {
					await sendMessage(newChatId || chatId!, message);
				}

				const answer = await askQuestion(messageContent, newChatId || chatId!, session.user?.email!, defaultModel);
				const parsedAnswer = JSON.parse(answer);
				updateConversation(newChatId || chatId!, parsedAnswer);
			} catch (error) {
				console.error("Error sending message:", error);
				toast.error("An error occurred while sending your message.");
			} finally {
				toast.dismiss(notificationId);
			}
		},
		[chatId, createNewChat, defaultModel, queryClient, reset, sendMessage, session, updateConversation]
	);

	const handlePressEnter = useCallback(
		(event: React.KeyboardEvent<HTMLTextAreaElement>) => {
			if (event.key === "Enter" && !event.shiftKey && !!watchMessage.trim()) {
				event.preventDefault();
				handleSubmit(onSubmit)();
			}
		},
		[handleSubmit, onSubmit, watchMessage]
	);

	return (
		<div className="w-full md:w-[calc(100%-.5rem)] md:border-transparent md:pt-0 dark:border-white/20 md:dark:border-transparent">
			<div className="m-auto px-3 text-base md:px-5 lg:px-1 xl:px-5">
				<div className="mx-auto flex flex-1 gap-4 text-base md:max-w-3xl md:gap-6 lg:max-w-[40rem] xl:max-w-3xl">
					<form className="w-full" onSubmit={handleSubmit(onSubmit)}>
						<div className="relative flex h-full max-w-full flex-1 flex-col">
							<div className="flex w-full items-center">
								<div className="flex w-full flex-col gap-1.5 rounded-[26px] bg-[#f4f4f4] p-1.5 transition-colors dark:bg-token-main-surface-secondary">
									<div className="flex items-center gap-1.5 md:gap-3.5">
										<div className="ml-3.5 flex min-w-0 flex-1 flex-col">
											<textarea
												{...register("message")}
												id="prompt-textarea"
												tabIndex={0}
												rows={1}
												placeholder="Message ChatGPT"
												className="m-0 max-h-[25dvh] resize-none border-0 bg-transparent px-0 text-token-text-primary focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
												onKeyDown={handlePressEnter}
												onInput={adjustTextAreaHeight}
											/>
										</div>
										<button
											type="submit"
											disabled={!watchMessage || !session}
											className="mb-1 mr-1 flex size-8 items-center justify-center rounded-full bg-black text-white transition-colors hover:opacity-70 focus-visible:outline-none focus-visible:outline-black disabled:bg-[#D7D7D7] disabled:text-[#f4f4f4] disabled:hover:opacity-100 dark:bg-white dark:text-black dark:focus-visible:outline-white disabled:dark:bg-token-text-quaternary dark:disabled:text-token-main-surface-secondary"
										>
											<ButtonSend />
										</button>
									</div>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
			<div className="relative p-2 text-center text-xs text-token-text-secondary md:px-[60px]">
				<span>ChatGPT can make mistakes. Check important info.</span>
			</div>
		</div>
	);
};

export default FormInput;
