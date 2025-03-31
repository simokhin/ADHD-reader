import { Bookmark } from "lucide-react";
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { addNote } from "@/app/actions";
import { toast } from "sonner";
import { useFormStatus } from "react-dom";

interface SentencesProps {
  displayedSentences: string[];
  lastParagraphRef: React.RefObject<HTMLDivElement>;
  session: {
    user: {
      id: string;
    };
  } | null;
}

function Submit() {
  const status = useFormStatus();

  return (
    <>
      <Button disabled={status.pending} className="hover:cursor-pointer mt-4">
        {status.pending ? "Saving..." : "Add note"}
      </Button>
    </>
  );
}

export default function Sentences({
  displayedSentences,
  lastParagraphRef,
  session,
}: SentencesProps) {
  const handleButtonKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === " ") {
      e.preventDefault(); // Запрещаем обработку пробела на кнопке
    }
  };

  return (
    <div
      className="max-w-prose mx-auto overflow-y-auto no-scrollbar p-4"
      style={{ maxHeight: "300px", minHeight: "300px", overflowY: "auto" }}
    >
      {displayedSentences.map((sentence, index) => (
        <div
          key={index}
          ref={
            index === displayedSentences.length - 1 ? lastParagraphRef : null
          }
          className={`mb-2 px-2 py-2 transition-all ease-in-out flex gap-4 justify-between items-center ${
            index === displayedSentences.length - 1
              ? "bg-chart-4 rounded-lg"
              : ""
          }`}
        >
          <p>{sentence}</p>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                onKeyDown={handleButtonKeyDown}
                onClick={(e) => {
                  if (!session) {
                    e.preventDefault(); // Prevent dialog from opening
                    toast("To save a note, you need to log in.");
                    return;
                  }
                }}
                variant="ghost"
                className="opacity-30 hover:cursor-pointer hover:opacity-100"
              >
                <Bookmark />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add note</DialogTitle>
                <form action={addNote} className="space-y-4 mt-4">
                  <Input
                    type="hidden"
                    name="userId"
                    value={session?.user.id}
                    readOnly
                  />
                  <div className="space-y-2">
                    <Label htmlFor="content">Content</Label>
                    <Input
                      readOnly
                      type="text"
                      name="content"
                      value={sentence}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Tag (optional)</Label>
                    <Input type="text" name="tag" />
                  </div>
                  <Submit />
                </form>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      ))}
    </div>
  );
}
