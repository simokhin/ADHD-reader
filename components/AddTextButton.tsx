import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Textarea } from "./ui/textarea";

export default function AddTextButton({
  handleButtonKeyDown,
  handleSubmit,
  inputValue,
  setInputValue,
  sentences,
}: {
  handleButtonKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  sentences: string[];
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="hover:cursor-pointer"
          onKeyDown={handleButtonKeyDown}
        >
          Add text
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Paste the text you want to read</DialogTitle>
          <DialogDescription className="mb-2">
            For the best application behavior, the added text should not contain
            images and other visual elements.
          </DialogDescription>
          <form onSubmit={handleSubmit}>
            <Textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="min-h-[250px] max-h-[250px] mb-4"
            />
            <DialogClose asChild>
              <Button
                type="submit"
                onKeyDown={handleButtonKeyDown}
                className="hover:cursor-pointer hover:bg-accent-foreground transition-all ease-in-out duration-300 active:scale-110"
              >
                Upload text
              </Button>
            </DialogClose>
            {sentences.length > 0 ? (
              <p className="mt-4 font-light inline-block pl-4">
                Text uploaded ✨
              </p>
            ) : (
              ""
            )}
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
