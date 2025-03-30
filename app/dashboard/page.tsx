import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getNotes } from "../actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { ModeToggle } from "@/components/ModeToggle";

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  const notes = await getNotes(session.user.id as string);

  return (
    <div>
      <header className="flex justify-between items-center p-4 gap-4">
        <div className="flex gap-4 items-center">
          <h1 className="text-xl sm:text-2xl uppercase font-bold">
            ADHD reader
          </h1>
        </div>

        <div className="flex gap-4 items-center justify-center">
          <ModeToggle />
        </div>
      </header>

      <div className="w-4xl mx-auto flex flex-col p-4 items-center mt-8">
        <h1 className="text-2xl uppercase font-bold mb-4">My notes</h1>
        {notes?.map((note) => (
          <div
            key={note.id}
            className="flex justify-between max-w-prose gap-4 p-4 bg-card rounded-xl mb-4"
          >
            <div className="space-y-8">
              <p>{note.content}</p>
              <div className="flex">
                <p className="font-light text-sm">{note.tag}</p>
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <Button variant="secondary" className="w-fit self-end">
                <Trash2 />
              </Button>
              <p className="font-extralight text-sm">
                {note.createdAt.toLocaleDateString("ru-RU")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
