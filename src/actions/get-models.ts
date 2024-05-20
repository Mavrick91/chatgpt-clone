"use server";

const blackListedModels = [
	"text-embedding-3-large",
	"text-embedding-3-small",
	"tts-1-hd-1106",
	"tts-1-1106",
	"tts-1-hd",
	"dall-e-2",
	"dall-e-3",
	"gpt-3.5-turbo-instruct-0914",
	"gpt-3.5-turbo-instruct",
	"babbage-002",
	"davinci-002",
	"tts-1",
	"whisper-1",
	"text-embedding-ada-002",
];

export async function getModels(openAIKey: string): Promise<Model[]> {
	try {
		if (!openAIKey) {
			throw new Error("API key is not configured");
		}

		const res = await fetch("https://api.openai.com/v1/models", {
			headers: {
				Authorization: `Bearer ${openAIKey}`,
			},
		});

		if (!res.ok) {
			throw new Error(`Failed to fetch models: ${res.statusText}`);
		}

		const data: Models = await res.json();

		const modelsSorted = data.data.sort((a, b) => b.created - a.created).filter((model) => !blackListedModels.includes(model.id));

		return modelsSorted;
	} catch (error) {
		console.error(error);
		throw new Error((error as Error).message);
	}
}
