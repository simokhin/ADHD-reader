import { Bookmark } from "lucide-react";
import { Button } from "./ui/button";

interface SentencesProps {
  displayedSentences: string[];
  lastParagraphRef: React.RefObject<HTMLParagraphElement | null>;
}

export default function Sentences({
  displayedSentences,
  lastParagraphRef,
}: SentencesProps) {
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
          className={`mb-2 px-2 py-2 transition-all ease-in-out flex justify-between items-center ${
            index === displayedSentences.length - 1
              ? "bg-chart-4 rounded-lg"
              : ""
          }`}
        >
          <p>{sentence}</p>
          <Button
            variant="ghost"
            className="opacity-30 hover:cursor-pointer hover:opacity-100"
          >
            <Bookmark />
          </Button>
        </div>
      ))}
    </div>
  );
}
