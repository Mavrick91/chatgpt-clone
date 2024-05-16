import GPTLogo from "@/components/svg/GPTLogo";

export default function Home() {
	return (
		<section className="flex h-full items-center justify-center">
			<div className="flex h-full flex-col items-center justify-center text-token-text-primary">
				<div className="relative">
					<div className="mb-3 size-12">
						<div className="relative flex h-full items-center justify-center rounded-full bg-token-main-surface-primary text-token-text-primary after:absolute after:inset-0 after:rounded-full after:border after:border-gray-600 after:p-2 after:content-['']">
							<GPTLogo />
						</div>
					</div>
				</div>
				<div className="mb-5 text-2xl font-medium">How can I help you today?</div>
			</div>
		</section>
	);
}
