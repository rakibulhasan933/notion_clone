"use client"
import React, { useState } from 'react'
import { Plus } from 'lucide-react';
import { useRouter } from "next/navigation";
import { Input } from './ui/input';
import { Button } from './ui/button';
import Link from 'next/link'
import Popup from './Popup';


export default function CreateNote() {
  const router = useRouter();
  const [input, setInput] = React.useState("");

  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input === "") {
      window.alert("Please enter a name for your notebook");
      return;
    }
  };


  return (
    <div>
      <div className="border-dashed border-2 flex border-green-600 h-full rounded-lg items-center justify-center sm:flex-col hover:shadow-xl transition hover:-translate-y-1 flex-row p-4">
        <button onClick={openPopup}>
          <Plus className="w-6 h-6 text-green-600" strokeWidth={3} />
          <h2 className="font-semibold text-green-600 sm:mt-2">
            New Note Book
          </h2>
        </button>
      </div>
      <Popup isOpen={isPopupOpen} onClose={closePopup}>

        <div className="text-center">
          <h2 className=" font-bold text-lg">New Note Book</h2>
          <p className=" font-light">You can create a new note by clicking the button below.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Name..."
          />
          <div className="h-4"></div>
          <div className="flex items-center gap-2">
            <Button type="reset" onClick={closePopup} variant={"secondary"}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-green-600"
            >
              Create
            </Button>
          </div>
        </form>
      </Popup>
    </div>
  )
}
