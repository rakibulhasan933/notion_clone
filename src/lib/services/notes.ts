import prisma from "../db/prismadb"

interface CreateNotesIProps {
	name: string,
	imageUrl: string,
	userId: string,
}

class NotesServices {
	public static async createNote(payload: CreateNotesIProps) {
		const { name, imageUrl, userId } = payload;

		return prisma?.note.create({
			data: {
				name,
				imageUrl,
				userId,
				editorState: "null"
			},
		});
	};
};

export default NotesServices;