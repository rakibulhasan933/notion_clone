import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react'
interface ParamsIProps {
	params: IdProps
}
interface IdProps {
	noteId: string,
}

export default function NoteID({ params }: ParamsIProps) {
	const { noteId } = params;
	return (
		<div className="min-h-screen grainy p-8">
			<div className="max-w-4xl mx-auto">
				<div className="border shadow-xl border-stone-200 rounded-lg p-4 flex items-center">
					<Link href="/dashboard">
						<Button className="bg-green-600" size="sm">
							Back
						</Button>
					</Link>
					<div className="w-3"></div>
					<span className="font-semibold">
						Hello User
					</span>
					<span className="inline-block mx-1">/</span>
					<span className="text-stone-500 font-semibold">Note Name</span>
					<div className="ml-auto">
						Deleted Button
					</div>
				</div>
				<div className="h-4"></div>
				<div className="border-stone-200 shadow-xl border rounded-lg px-16 py-8 w-full">
					Code Editor
				</div>
			</div>
		</div>
	)
}
