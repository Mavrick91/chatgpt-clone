import ChatGPTLogo from "@/components/svg/ChatGPTLogo";
import { DocumentData } from "firebase/firestore";
import "github-markdown-css/github-markdown.css";
import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
	messages: DocumentData[] | undefined;
};

const ChatMessages = ({ messages }: Props) => {
	const { data: session } = useSession();
	const messagesEndRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [messages]);

	return (
		<div className="size-full overflow-y-auto overflow-x-hidden">
			{messages?.map((message) => {
				if (message.user._id === session?.user?.email)
					return (
						<div key={message.id} className="w-full text-token-text-primary">
							<div className="m-auto px-3 py-[18px] text-base md:px-5 lg:px-1 xl:px-5">
								<div className="mx-auto flex flex-1 gap-4 text-base md:max-w-3xl md:gap-6 lg:max-w-[40rem] xl:max-w-3xl">
									<div className="group/conversation-turn relative flex w-full min-w-0 flex-col">
										<div className="flex-col gap-1 md:gap-3">
											<div className="flex max-w-full grow flex-col">
												<div className="flex min-h-[20px] w-full flex-col items-end gap-2 overflow-x-auto whitespace-pre-wrap break-words [.text-message+&]:mt-5">
													<div className="flex w-full flex-col items-end gap-1 empty:hidden rtl:items-start">
														<div className="relative max-w-[90%] rounded-3xl bg-[#f4f4f4] px-5 py-2.5 dark:bg-token-main-surface-secondary">{message.text}</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					);

				return (
					<div key={message.id} className="m-auto px-3 py-[18px] text-base md:px-5 lg:px-1 xl:px-5">
						<div className="mx-auto flex flex-1 gap-4 text-base md:max-w-3xl md:gap-6 lg:max-w-[40rem] xl:max-w-3xl">
							<div className="relative flex shrink-0 flex-col items-end">
								<div className="pt-1">
									<div className="relative flex size-8 items-start justify-center rounded-sm bg-token-main-surface-primary text-token-text-primary">
										<ChatGPTLogo />
									</div>
								</div>
							</div>
							<ReactMarkdown className="markdown prose dark:prose-invert dark w-full max-w-none break-words" remarkPlugins={[remarkGfm]}>
								{message.text}
							</ReactMarkdown>
						</div>
					</div>
				);
			})}
			<div ref={messagesEndRef} />
		</div>
	);
};

export default ChatMessages;
