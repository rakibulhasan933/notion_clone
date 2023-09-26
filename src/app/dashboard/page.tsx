import React from 'react'
import { currentUser } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/api";
import Image from 'next/image';
import { UserButton } from "@clerk/nextjs";

export default async function Dashboard() {
	const user: User | null = await currentUser();
	return (
		<div className=' grid place-items-center'>
			<h1>Dashboard</h1>
			<h2>User {user?.firstName}</h2>
			<UserButton afterSignOutUrl="/" />
		</div>
	)
}
