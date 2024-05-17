import FormInput from "@/components/FormInput";
import HomePageLogo from "./_components/HomePageLogo";

export default function Home() {
	return (
		<div className="relative flex h-full flex-col">
			<HomePageLogo />

			<FormInput />
		</div>
	);
}
