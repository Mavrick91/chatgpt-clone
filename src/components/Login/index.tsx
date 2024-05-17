"use client";

import GoogleLogo from "@/components/svg/GoogleLogo";
import { signIn } from "next-auth/react";

const Login = () => {
	return (
		<div className="flex h-full flex-col items-center justify-center bg-white">
			<div className="p-10">
				<h1 className="text-4xl font-bold text-[#2d333a]">Welcome back</h1>
			</div>

			<button className="social-btn" onClick={() => signIn("google")}>
				<span className="social-logo-wrapper">
					<GoogleLogo />
				</span>
				<span className="text-left">Continue with Google</span>
			</button>
		</div>
	);
};

export default Login;
