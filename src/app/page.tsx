import GPTLogo from "@/components/svg/GPTLogo";

export default function Home() {
	return (
		<section className="h-full flex justify-center items-center">
			<div className="flex h-full flex-col items-center justify-center text-token-text-primary">
				<div className="relative">
					<div className="mb-3 h-12 w-12">
						<div className="relative flex h-full items-center justify-center rounded-full bg-token-main-surface-primary text-token-text-primary">
							<GPTLogo />
						</div>
					</div>
				</div>
				<div className="mb-5 text-2xl font-medium">How can I help you today?</div>
			</div>
		</section>
	);
}
