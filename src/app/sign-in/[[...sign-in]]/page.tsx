import React from 'react';
import { SignIn } from "@clerk/nextjs";

export default function page() {
	return (
		<div className=' h-screen grid place-items-center'>
			<SignIn />
		</div>
	)
}
