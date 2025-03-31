import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getNotes, getTags } from "../actions";
import { ModeToggle } from "@/components/ModeToggle";
import Link from "next/link";
import SignoutButton from "./SignoutButton";
import Notes from "./Notes";

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  const notes = await getNotes(session.user.id as string);
  const tags = await getTags(session.user.id as string);

  return (
    <div>
      <header className="flex justify-between items-center p-4 gap-4 border-b-1 border-border">
        <div className="flex gap-4 items-center">
          <h1 className="text-xl sm:text-2xl uppercase font-bold">
            <Link href="/">ADHD reader</Link>
          </h1>
        </div>

        <div className="flex gap-4 items-center justify-center">
          <ModeToggle />
          <SignoutButton />
        </div>
      </header>

      <Notes tags={tags} notes={notes} />
    </div>
  );
}
