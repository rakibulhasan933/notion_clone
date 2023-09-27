"use client"
import React, { useState } from 'react'
import { Loader2, Plus } from 'lucide-react';
import { useRouter } from "next/navigation";
import { Input } from './ui/input';
import { Button } from './ui/button';
import Link from 'next/link'
import Popup from './Popup';
import { useMutation } from '@tanstack/react-query';
import axios from "axios";


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
  // Data  send
  const createNoteBooks = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/createNoteBook", {
        name: input,
      });
      return response.data;
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input === "") {
      window.alert("Please enter a name for your notebook");
      return;
    }
    createNoteBooks.mutate(undefined, {
      onSuccess: () => {
        closePopup();
      },
      onError: (error) => {
        console.log(error);
      }
    })
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
              disabled={createNoteBooks.isLoading}
            >
              {createNoteBooks.isLoading && (
                <Loader2 className=' w-4 h-4 mr-2 animate-spin' />
              )}
              Create
            </Button>
          </div>
        </form>
      </Popup>
    </div>
  )
}
