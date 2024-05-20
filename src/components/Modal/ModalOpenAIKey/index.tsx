import Button from "@/components/Button";
import { useOpenAI } from "@/providers/OpenAIProvider";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "..";
import { useQueryClient } from "@tanstack/react-query";

type FormData = {
	apiKey: string;
};

const ModalOpenAIKey = () => {
	const queryClient = useQueryClient();
	const { updateKey, key } = useOpenAI();
	const { register, handleSubmit, watch } = useForm<FormData>();
	const [errorApiKey, setErrorApiKey] = useState("");

	const queryState = queryClient.getQueryState(["models"]);

	const watchApiKey = watch("apiKey");

	const onSubmit = (data: FormData) => {
		setErrorApiKey("");
		updateKey(data.apiKey);
	};

	useEffect(() => {
		if (queryState?.error) {
			setErrorApiKey("Invalid API key");
		}
	}, [queryState?.error]);

	return (
		<Modal isVisible={!key}>
			<div className="flex max-w-[500px] flex-col px-5 py-3">
				<h1 className="mb-2 text-3xl text-white">Enter API key</h1>
				<p className="text-sm text-token-text-secondary">
					To use our platform, you&apos;ll need to provide your API key. This allows us to securely authenticate your requests and provide you with the best possible experience.
				</p>
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
					<div className="my-5 grid grid-cols-4 items-center gap-4">
						<label className="text-right text-white" htmlFor="api-key">
							API Key
						</label>
						<input
							autoComplete="off"
							autoFocus
							{...register("apiKey")}
							className="col-span-3 rounded-3xl bg-token-main-surface-secondary p-1.5 pl-3.5 text-token-text-primary focus-visible:outline-none focus-visible:ring-0"
							id="api-key"
							placeholder="Enter your API key"
						/>
						{errorApiKey && <span className="col-span-4 ml-auto text-sm text-red-500">{errorApiKey}</span>}
					</div>
					<Button
						disabled={!watchApiKey}
						type="submit"
						className="ml-auto rounded-full border border-medium px-3 py-1.5 font-light text-white transition-all hover:bg-token-main-surface-secondary disabled:hover:bg-token-main-surface-primary"
					>
						Save API key
					</Button>
				</form>
			</div>
		</Modal>
	);
};

export default ModalOpenAIKey;
