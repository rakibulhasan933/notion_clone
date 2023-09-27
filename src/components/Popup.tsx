"use client"
import React, { ReactNode } from 'react';

interface PopupProps {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, children }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
			<div className="bg-white p-4 rounded-md shadow-md">
				{children}
			</div>
		</div>
	);
};

export default Popup;
