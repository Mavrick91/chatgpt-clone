"use server";

export async function getModels() {
	const res = await fetch("https://api.openai.com/v1/models", {
		headers: {
			Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
		},
	});
	const data: Models = await res.json();

	const modelsSorted = data.data.sort((a, b) => b.created - a.created);

	return modelsSorted;
}
