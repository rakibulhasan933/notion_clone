import { NextResponse } from "next/server";
import prisma from "@/lib/db/prismadb";

interface ParamsIProps {
	params: UserIDProps
};
interface UserIDProps {
	noteId: string
};

export async function GET(request: Request, { params }: ParamsIProps) {
	try {
		const { noteId } = params;
		const note = await prisma?.note.findUnique({
			where: {
				id: noteId,
			},
		});

		if (!note) {
			return NextResponse.json({ message: "Note Not Found" }, { status: 404 });
		};
		console.log({ note });

		return NextResponse.json({ note });

	} catch (error) {
		return NextResponse.json({ message: "GET Error", error }, { status: 500 })
	};
};