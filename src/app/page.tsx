import FormInput from "@/components/FormInput";
import Welcome from "./_components/Welcome";

export default function Home() {
	return (
		<div className="relative flex grow flex-col">
			<Welcome />
			{/* <HomePageLogo /> */}

			<FormInput />
		</div>
	);
}
