"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { deleteNote } from "../actions";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Note {
  id: string;
  content: string;
  tag: string;
  createdAt: Date;
}

interface NotesProps {
  tags: (string | { tag: string })[];
  notes: Note[];
}

export default function Notes({ tags, notes }: NotesProps) {
  const [tag, setTag] = useState("");

  const handleClick = (tag: string) => {
    setTag(tag);
  };

  const filteredNotes = tag ? notes.filter((note) => note.tag === tag) : notes;

  return (
    <div className="w-4xl mx-auto flex flex-col p-4 items-center mt-8">
      <h1 className="text-2xl uppercase font-bold mb-4">My notes</h1>
      <div className="max-w-prose flex gap-2 mb-4 flex-wrap justify-center">
        {tags?.map((tag) => (
          <Button
            className="hover:cursor-pointer bg-chart-3"
            key={tag as string}
            onClick={() => handleClick(tag as string)}
          >
            {typeof tag === "string" ? tag : tag?.tag || "Unknown"}
          </Button>
        ))}
      </div>

      {filteredNotes.map((note) => (
        <div
          key={note.id}
          className="flex justify-between max-w-prose gap-4 p-4 bg-accent rounded-xl mb-4 border-1 border-border"
        >
          <div className="space-y-8 ">
            <p>{note.content}</p>
            <div className="flex">
              <p className="font-light text-sm">{note.tag}</p>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="w-fit self-end hover:cursor-pointer"
                >
                  <Trash2 />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete your note.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="hover:cursor-pointer">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="hover:cursor-pointer"
                    onClick={async () => await deleteNote(note.id)}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <p className="font-extralight text-sm ">
              {note.createdAt.toLocaleDateString("ru-RU")}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
