import type { NextApiResponse } from "next";
import { NextResponse } from "next/server";

type ResponseData = {
	answer: string;
};

export async function GET(req: Request, res: NextApiResponse<ResponseData>) {
	try {
		const res = await fetch("https://api.openai.com/v1/models", {
			headers: {
				Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
			},
		});
		const data: Models = await res.json();

		const modelsSorted = data.data.sort((a, b) => b.created - a.created);

		return NextResponse.json(modelsSorted, {
			status: 200,
		});
	} catch (error) {
		console.error(error);

		return NextResponse.json({ answer: `Could not retrieve the models` }, { status: 500 });
	}
}
