"use client"
import React from 'react'
import Typewriter from "typewriter-effect";


export default function TypeWriter() {
	return (
		<Typewriter
			options={{
				loop: true,
			}}
			onInit={(typewriter) => {
				typewriter
					.typeString("🚀 Supercharged Productivity.")
					.pauseFor(1000)
					.deleteAll()
					.typeString("🤖 AI-Powered Insights.")
					.start();
			}}
		/>
	)
}
