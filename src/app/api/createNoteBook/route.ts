import NotesServices from "@/lib/services/notes";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai-edge";


// Configuration OpenAi
const config = new Configuration({
	apiKey: process.env.OPENAI_API_KEY
});

const openAi = new OpenAIApi(config);

export async function POST(request: Request) {
	const body = await request.json();
	const { name, userId }: { name: string, userId: string } = body;
	console.log({ userId });
	// Chat
	const response = await openAi.createChatCompletion({
		model: "gpt-3.5-turbo",
		messages: [
			{
				role: "system",
				content: "You are an creative and helpful AI assistance capable of generating interesting thumbnail descriptions for my notes. Your output will be fed into the DALLE API to generate a thumbnail. The description should be minimalistic and flat styled",
			},
			{
				role: "user",
				content: `Please generate a thumbnail description for my notebook titles ${name}`
			}
		],
	});
	const data = await response.json();
	const image_description = data.choices[0].message.content as string;

	console.log({ image_description });

	if (!image_description) {
		return new NextResponse("failed to generate image description", {
			status: 500,
		});
	};
	// Photo created
	const photoResponse = await openAi.createImage({
		prompt: image_description,
		n: 1,
		size: "256x256"
	});
	const url = await photoResponse.json();
	const image_url = url?.data[0]?.url as string;

	console.log({ image_url });

	if (!image_url) {
		return new NextResponse("Fail to Generate Image");
	};
	const result = await NotesServices.createNote({ name, userId, imageUrl: image_url })

	return NextResponse.json(result);
};