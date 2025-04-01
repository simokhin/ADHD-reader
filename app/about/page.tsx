import { ModeToggle } from "@/components/ModeToggle";
import Link from "next/link";

export default function About() {
  return (
    <>
      <main className="h-screen  flex flex-col mx-auto">
        <header className="flex justify-between items-center p-4 gap-4 border-b-1 border-border">
          <div className="flex gap-4 items-center">
            <h1 className="text-xl sm:text-2xl uppercase font-bold">
              <Link href="/">ADHD reader</Link>
            </h1>
          </div>

          <div className="flex gap-4 items-center justify-center">
            <ModeToggle />
          </div>
        </header>
        <div className="max-w-prose mx-auto flex flex-col justify-center flex-1 p-4">
          <h1 className="font-bold text-2xl mb-4">How it works</h1>
          <div className="text-lg">
            <p className="mb-4">
              Many people struggle to concentrate when reading continuous text,
              especially in keeping their eyes focused on the sentence they are
              currently reading. This can be due to ADHD, dyslexia, or vision
              problems (such as astigmatism).
            </p>
            <p className="mb-4">
              My method is simple: the text is split into sentences and
              displayed one at a time (when you press the spacebar),{" "}
              <span className="bg-chart-1 px-1">
                with the current sentence highlighted in color.
              </span>{" "}
              This makes reading easier and helps to follow the flow of the
              text.
            </p>
            <ul className="list-disc pl-4">
              <li>Paste the text you want to read.</li>
              <li>
                Press the spacebar or the “Next” button — sentences will appear
                one by one.
              </li>
              <li>
                Save important fragments to notes if needed (an account is
                required for this).
              </li>
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}
