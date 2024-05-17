import FormInput from "@/components/FormInput";
import ChatMessages from "./_components/ChatMessages";

const Chat = ({ params }: NextPageProps) => {
	return (
		<div className="relative flex h-full flex-col">
			<div className="flex h-0 grow flex-col items-center justify-center text-token-text-primary">
				<div className="size-full overflow-y-auto">
					<ChatMessages chatId={params.id} />
				</div>
			</div>
			<FormInput chatId={params.id} />
		</div>
	);
};

export default Chat;
