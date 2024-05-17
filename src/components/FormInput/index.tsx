"use client";

import AddFileIcon from "@/components/svg/AddFileIcon";
import ButtonSend from "@/components/svg/ButtonSend";
import { db } from "@/firebase";
import { useModels } from "@/providers/ModelsProvider";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useRef } from "react";
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
	const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

	const { watch, handleSubmit, register, reset } = useForm<FormData>();

	const watchMessage = watch("message");

	const adjustTextAreaHeight = useCallback(() => {
		if (textAreaRef.current) {
			textAreaRef.current.style.height = "auto";
			textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
		}
	}, []);

	useEffect(() => {
		adjustTextAreaHeight();
	}, [watchMessage, adjustTextAreaHeight]);

	const onSubmit = useCallback(
		async (data: FormData) => {
			const notificationId = toast.loading("ChatGPT is thinking...");
			reset();

			const text = data.message.trim();

			const message: Message = {
				text,
				createdAt: serverTimestamp(),
				user: {
					_id: session?.user?.email!,
					name: session?.user?.name!,
					avatar: session?.user?.image!,
				},
			};

			if (chatId) await addDoc(collection(db, "users", session?.user?.email!, "chats", chatId, "messages"), message);

			await fetch("/api/askQuestion", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ prompt: text, chatId, model: defaultModel, session }),
			})
				.catch(() => {
					toast.error("An error occurred. Please try again later.");
				})
				.finally(() => {
					toast.dismiss(notificationId);
				});
		},
		[chatId, defaultModel, reset, session]
	);

	const handlePressEnter = useCallback(
		(event: React.KeyboardEvent<HTMLTextAreaElement>) => {
			if (event.key === "Enter" && !event.shiftKey) {
				event.preventDefault();
				handleSubmit(onSubmit)();
			}
		},
		[handleSubmit, onSubmit]
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
										<label htmlFor="file" className="cursor-pointer" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:rhi:" data-state="closed">
											<div className="flex">
												<div
													className="flex size-8 items-center justify-center rounded-full text-token-text-primary focus-visible:outline-black dark:text-white dark:focus-visible:outline-white"
													aria-label="Attach files"
												>
													<AddFileIcon />
												</div>
												<input multiple id="file" type="file" tabIndex={-1} className="hidden" />
											</div>
										</label>
										<div className="flex min-w-0 flex-1 flex-col">
											<textarea
												{...register("message")}
												id="prompt-textarea"
												tabIndex={0}
												rows={1}
												ref={textAreaRef}
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
