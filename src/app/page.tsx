import FormInput from "./_components/FormInput";
import HomePageLogo from "./_components/HomePageLogo";

export default function Home() {
	return (
		<main className="transition-width relative size-full flex-1 overflow-auto">
			<div role="presentation" tabIndex={0} className="flex h-full flex-col focus-visible:outline-0">
				<HomePageLogo />

				<FormInput />
			</div>
		</main>
	);
}
