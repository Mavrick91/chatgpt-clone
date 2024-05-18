"use server";

import { openai } from "@/lib/chatgpt";
import admin from "firebase-admin";
import { adminDb } from "@/firebaseAdmin";

export async function askQuestion(prompt: string, chatId: string, email: string, model: string) {
	const response = await openai.chat.completions.create({
		model,
		messages: [{ role: "user", content: prompt }],
		temperature: 0.7,
		top_p: 1,
		max_tokens: 1000,
		frequency_penalty: 0,
		presence_penalty: 0,
	});

	if (!response) {
		// return `ChatGPT was unable to find an answer for that! (Error: ${error.message})`;
		return `ChatGPT was unable to find an answer for that!`;
	}

	const text = response.choices[0].message.content;

	const message: Message = {
		text: text || "ChatGPT was unable to find an answer for that!",
		createdAt: admin.firestore.Timestamp.now(),
		user: {
			_id: "chatgpt",
			name: "ChatGPT",
			avatar: "/chatgpt.png",
		},
	};

	await adminDb.collection("users").doc(email).collection("chats").doc(chatId).collection("messages").add(message);

	return JSON.stringify(message);
}
