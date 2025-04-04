"use client";

import { KeyboardEvent, useEffect, useState, useRef } from "react";
import { ModeToggle } from "../components/ModeToggle";
import Sentences from "@/components/Sentences";
import Progress from "@/components/Progress";
import AddTextButton from "@/components/AddTextButton";
import { toast } from "sonner";
import { splitSentences } from "@/utils/split-sentences";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogIn, NotebookText } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const {
    data: session,
    // isPending, //loading state
    // error, //error object
    // refetch, //refetch the session
  } = authClient.useSession();

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
    <div className=" mx-auto min-h-screen flex flex-col">
      <header className="flex justify-between items-center p-4 gap-4 border-b-1 border-border">
        <div className="flex gap-4 items-center">
          <h1 className="text-xl sm:text-2xl uppercase font-bold">
            <Link href="/">ADHD reader</Link>
          </h1>
        </div>

        <div className="flex gap-4 items-center justify-center">
          <ModeToggle />
          {session ? (
            <Link href="/dashboard">
              <Button className="hover:cursor-pointer">
                <NotebookText />
              </Button>
            </Link>
          ) : (
            <Link href="/signin">
              <Button className="hover:cursor-pointer">
                <LogIn />
              </Button>
            </Link>
          )}
        </div>
      </header>

      {sentences.length === 0 && (
        <div className="flex flex-col justify-center items-center text-lg gap-4 font-medium mt-8 p-4 h-72">
          <p>Click the &#171;Add text&#187; button to start! ✨</p>
          <div className="flex gap-4">
            <AddTextButton
              handleButtonKeyDown={handleButtonKeyDown}
              handleSubmit={handleSubmit}
              inputValue={inputValue}
              setInputValue={setInputValue}
              sentences={sentences}
            />
            <Link href="/about">
              <Button variant="secondary" className="hover:cursor-pointer">
                How it works
              </Button>
            </Link>
          </div>
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
          session={session}
        />

        <Progress
          sentences={sentences}
          progress={progress}
          handleClick={handleClick}
        />
        {sentences.length !== 0 && (
          <div className="flex justify-center sm:hidden mt-auto p-4 mb-24">
            <Button className="px-16" onClick={handleTap}>
              Next
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
