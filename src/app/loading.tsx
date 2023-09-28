import { Loader2 } from 'lucide-react'
import React from 'react'

export default function loading() {
	return (
		<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
			<Loader2 className=' w-20 h-20 mr-2 animate-spin' />
		</div>
	)
}
