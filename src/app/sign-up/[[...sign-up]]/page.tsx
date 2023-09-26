import React from 'react'
import { SignUp } from "@clerk/nextjs";

export default function Register() {
	return (
		<div className=' grid place-items-center h-screen'>
			<SignUp />
		</div>
	)
}
