import { generateImage, generateImagePrompt } from "@/lib/ai/openai";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prisma from "@/lib/db/prismadb";

export const runtime = "edge";

export async function POST(request: Request) {
	const { userId } = auth();

	if (!userId) {
		return new NextResponse("User Not Found")
	};
	const body = await request.json();
	const { name }: { name: string } = body;
	const image_description = await generateImagePrompt(name);
	if (!image_description) {
		return new NextResponse("failed to generate image description", {
			status: 500,
		});
	}
	const image_url = await generateImage(image_description);

	if (!image_url) {
		return new NextResponse("Fail to Generate Image");
	};
	const result = await prisma.note.create({
		data: {
			name: name,
			imageUrl: image_url,
			userId,
			editorState: "null"
		},
	});

	console.log({ result });

	return NextResponse.json(result);
};