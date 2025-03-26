"use client";

import { KeyboardEvent, useEffect, useState, useRef } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { ModeToggle } from "./ModeToggle";

export default function TextField() {
  // Сохраняем предложения в State, как массив
  const [sentences, setSentences] = useState<string[]>([]);

  // Предложения, которые отображаются на странице
  const [displayedSentences, setDisplayedSentences] = useState<string[]>([]);

  // Сохраняем значение из TextArea
  const [inputValue, setInputValue] = useState<string>("");

  // Считаем отображаемые предложения
  const [index, setIndex] = useState(0);

  // Ссылка на последний добавленный абзац
  const lastParagraphRef = useRef<HTMLParagraphElement | null>(null);

  const [progress, setProgress] = useState(0);

  const handleClick = (e: React.FormEvent) => {
    e.preventDefault();

    setSentences([]);
    setDisplayedSentences([]);
    setIndex(0);
    setProgress(0);
  };

  // Обрабатываем нажатие на кнопку "Загрузить текст"
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const sentances =
      (inputValue ?? "")
        .trim()
        .split(
          /(?<!\b(?:g|t|i|e|et|dr|mr|ms|mrs|etc|e\.g|i\.e|a\.m|p\.m|vol|vs|jr|sr|prof|st|co|llc|gov)\.)(?<=\.|\!|\?)\s+/
        ) || [];

    if (!sentances[sentances.length - 1].endsWith(".") && inputValue.trim()) {
      sentances[sentances.length - 1] += ".";
    }

    setInputValue("");
    setSentences(sentances);
    setDisplayedSentences([]); // Сброс отображенных предложений
    setIndex(0); // Сброс индекса
    setProgress(0); // Сброс прогресса
  };

  useEffect(() => {
    const handleKeyDown = (e: Event) => {
      if (
        (e as unknown as KeyboardEvent).key === " " &&
        index < sentences.length
      ) {
        setDisplayedSentences((prev) => [...prev, sentences[index]]);
        setIndex((prevIndex) => prevIndex + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [index, sentences]);

  useEffect(() => {
    const handleTouchStart = () => {
      // Тип Event можно не указывать, если не используется
      if (index < sentences.length) {
        setDisplayedSentences((prev) => [...prev, sentences[index]]);
        setIndex((prevIndex) => prevIndex + 1);
      }
    };

    window.addEventListener("touchstart", handleTouchStart);
    return () => window.removeEventListener("touchstart", handleTouchStart);
  }, [index, sentences]);

  useEffect(() => {
    // Прокручиваем к последнему абзацу, если он существует
    if (lastParagraphRef.current) {
      lastParagraphRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest", // Прокручиваем к ближайшему элементу (в данном случае, последний)
      });
    }

    const newProgress = Math.round(
      (displayedSentences.length / sentences.length) * 100
    );
    setProgress(newProgress);
  }, [displayedSentences, sentences]); // Этот эффект сработает каждый раз, когда отображаются новые предложения

  const handleButtonKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === " ") {
      e.preventDefault(); // Запрещаем обработку пробела на кнопке
    }
  };

  return (
    <div className="container mx-auto max-h-screen">
      <header className="flex justify-between items-center p-4 gap-4">
        <div className="flex gap-4 items-center">
          <h1 className="text-xl sm:text-2xl uppercase font-bold">
            ADHD reader
          </h1>
        </div>

        <div className="flex gap-4 items-center justify-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button onKeyDown={handleButtonKeyDown}>Add text</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Paste the text you want to read</DialogTitle>
                <DialogDescription className="mb-2">
                  For the best application behavior, the added text should not
                  contain images and other visual elements.
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
          {/* <p className="font-light">Добавьте текст ✨</p> */}
          <ModeToggle />
        </div>
      </header>
      {sentences.length === 0 ? (
        <div className="flex justify-center items-center text-lg mt-8 p-4">
          Click the "Add text" button to start! ✨
        </div>
      ) : (
        ""
      )}
      <main className="mt-4 sm:mt-8">
        <div className="container mx-auto flex justify-center">
          {sentences.length > 0 ? (
            <p className="hidden md:block opacity-80 font-light mb-4 sm:mb-8 p-4 text-center">
              Press SPACE to start displaying the text
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="container mx-auto flex justify-center">
          {sentences.length > 0 ? (
            <p className=" md:hidden opacity-80 font-light mb-4 sm:mb-8 p-4 text-center">
              Tap the screen to start displaying the text
            </p>
          ) : (
            ""
          )}
        </div>
        <div
          className="max-w-prose mx-auto overflow-y-auto no-scrollbar p-4"
          style={{ maxHeight: "300px", minHeight: "300px", overflowY: "auto" }}
        >
          {displayedSentences.map((sentence, index) => (
            <p
              key={index}
              ref={
                index === displayedSentences.length - 1
                  ? lastParagraphRef
                  : null
              }
              className={`mb-2 px-2 py-2 transition-all ease-in-out ${
                index === displayedSentences.length - 1
                  ? "bg-chart-4 rounded-lg"
                  : ""
              }`}
            >
              {sentence}
            </p>
          ))}
        </div>
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
              <Button variant="outline" onClick={handleClick} className="mt-4">
                Reset text
              </Button>
            </div>
          )}{" "}
        </div>
      </main>
    </div>
  );
}
