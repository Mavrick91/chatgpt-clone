import FormInput from "@/components/FormInput";
import ChatMessages from "./_components/ChatMessages";

const Chat = ({ params }: NextPageProps) => {
	const chatId = params.id;

	return (
		<div className="relative flex h-full flex-col">
			<div className="flex h-0 grow flex-col items-center justify-center text-token-text-primary">
			<ChatMessages chatId={chatId} />
			</div>
			<FormInput chatId={chatId} />
		</div>
	);
};

export default Chat;
