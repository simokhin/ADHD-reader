"use client";

import { KeyboardEvent, useEffect, useState, useRef } from "react";
import { ModeToggle } from "../components/ModeToggle";
import Sentences from "@/components/Sentences";
import Progress from "@/components/Progress";
import AddTextButton from "@/components/AddTextButton";
import { toast } from "sonner";
import { splitSentences } from "@/utils/split-sentences";
import { Button } from "@/components/ui/button";

export default function Home() {
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

    if (!inputValue) {
      toast("Empty field.");
      return;
    }

    const sentences = splitSentences(inputValue);

    // if (
    //   sentences.length > 0 &&
    //   !sentences[sentences.length - 1].endsWith(".") &&
    //   inputValue.trim()
    // ) {
    //   sentences[sentences.length - 1] += ".";
    // }

    setInputValue("");
    setSentences(sentences);
    setDisplayedSentences([]); // Сброс отображенных предложений
    setIndex(0); // Сброс индекса
    setProgress(0); // Сброс прогресса
  };

  // Появление сообщени при нажатии на пробел
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

  // Появление сообщений на тап по экрану
  // useEffect(() => {
  //   const handleTouchStart = () => {
  //     // Тип Event можно не указывать, если не используется
  //     if (index < sentences.length) {
  //       setDisplayedSentences((prev) => [...prev, sentences[index]]);
  //       setIndex((prevIndex) => prevIndex + 1);
  //     }
  //   };

  //   window.addEventListener("touchstart", handleTouchStart);
  //   return () => window.removeEventListener("touchstart", handleTouchStart);
  // }, [index, sentences]);

  const handleTap = () => {
    if (index < sentences.length) {
      setDisplayedSentences((prev) => [...prev, sentences[index]]);
      setIndex((prevIndex) => prevIndex + 1);
    }
  };

  // Прокрутка
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
    <div className="container mx-auto min-h-screen flex flex-col">
      <header className="flex justify-between items-center p-4 gap-4">
        <div className="flex gap-4 items-center">
          <h1 className="text-xl sm:text-2xl uppercase font-bold">
            ADHD reader
          </h1>
        </div>

        <div className="flex gap-4 items-center justify-center">
          <AddTextButton
            handleButtonKeyDown={handleButtonKeyDown}
            handleSubmit={handleSubmit}
            inputValue={inputValue}
            setInputValue={setInputValue}
            sentences={sentences}
          />
          <ModeToggle />
        </div>
      </header>

      {sentences.length === 0 && (
        <div className="flex justify-center items-center text-lg font-bold mt-8 p-4 h-72">
          Click the &#171;Add text&#187; button to start! ✨
        </div>
      )}

      <main className="mt-4 sm:mt-8 flex flex-col flex-grow">
        <div className="container mx-auto flex justify-center">
          {sentences.length > 0 && (
            <p className="hidden md:block opacity-80 font-light mb-4 sm:mb-8 p-4 text-center">
              Press SPACE to start displaying the text
            </p>
          )}
        </div>

        <div className="container mx-auto flex justify-center">
          {sentences.length > 0 && (
            <p className="md:hidden opacity-80 font-light mb-4 sm:mb-8 p-4 text-center">
              Tap the screen to start displaying the text
            </p>
          )}
        </div>

        <Sentences
          displayedSentences={displayedSentences}
          lastParagraphRef={lastParagraphRef}
        />

        <Progress
          sentences={sentences}
          progress={progress}
          handleClick={handleClick}
        />

        <div className="flex justify-center sm:hidden mt-auto p-4">
          <Button variant="secondary" className="px-16" onClick={handleTap}>
            Next
          </Button>
        </div>
      </main>
    </div>
  );
}
