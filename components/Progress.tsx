import { Button } from "./ui/button";

interface ProgressProps {
  sentences: string[];
  progress: number;
  handleClick: (e: React.FormEvent) => void;
}

export default function Progress({
  sentences,
  progress,
  handleClick,
}: ProgressProps) {
  return (
    <div className="mt-4 sm:mt-8">
      {sentences.length > 0 && (
        <div className="text-center mb-4 max-w-[400px] mx-auto p-4 ">
          <p className="text-sm opacity-50 mb-2">{progress}%</p>
          <div className="h-2 w-full bg-gray-300 rounded-full">
            <div
              className="h-full bg-chart-3 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <Button variant="secondary" onClick={handleClick} className="mt-4">
            Reset text
          </Button>
        </div>
      )}{" "}
    </div>
  );
}
