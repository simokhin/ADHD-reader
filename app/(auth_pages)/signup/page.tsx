import { ModeToggle } from "@/components/ModeToggle";
import { SignUp } from "./RegisterForm";
import Link from "next/link";

export default function page() {
  return (
    <>
      <main className="h-screen mx-auto flex flex-col">
        <header className="flex justify-between items-center p-4 gap-4 border-1 border-border">
          <div className="flex gap-4 items-center">
            <h1 className="text-xl sm:text-2xl uppercase font-bold">
              <Link href="/">ADHD reader</Link>
            </h1>
          </div>

          <div className="flex gap-4 items-center justify-center">
            <ModeToggle />
          </div>
        </header>
        <div className="max-w-3xl mx-auto flex justify-center items-center flex-1">
          <SignUp />
        </div>
      </main>
    </>
  );
}
