import admin from "firebase-admin";
import query from "@/lib/queryApi";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { adminDb } from "@/firebaseAdmin";

type ResponseData = {
	answer: string;
};

export async function POST(req: Request, res: NextApiResponse<ResponseData>) {
	try {
		const data = await req.json();
		const { prompt, chatId, session, model } = data;

		if (!chatId) return NextResponse.json({ answer: "Chat ID is required!" }, { status: 400 });

		const response = await query(prompt, chatId, model);

		const message: Message = {
			text: response || "ChatGPT was unable to find an answer for that!",
			createdAt: admin.firestore.Timestamp.now(),
			user: {
				_id: "chatgpt",
				name: "ChatGPT",
				avatar: "/chatgpt.png",
			},
		};

		await adminDb.collection("users").doc(session?.user?.email).collection("chats").doc(chatId).collection("messages").add(message);

		return NextResponse.json(
			{ answer: message.text },
			{
				status: 200,
			}
		);
	} catch (error) {
		console.error(error);

		return NextResponse.json({ answer: error.message }, { status: 500 });
	}
}
