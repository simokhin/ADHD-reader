"use client";

import { KeyboardEvent, useEffect, useState, useRef } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import {
  Dialog,
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

  // Обрабатываем нажатие на кнопку "Загрузить текст"
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const sentances = (inputValue ?? "").match(/[^.!?]+[.!?]*/g) || [];
    setSentences(sentances);
    setDisplayedSentences([]); // Сброс отображенных предложений
    setIndex(0); // Сброс индекса
    setProgress(0); // Сброс прогресса
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " " && index < sentences.length) {
        setDisplayedSentences((prev) => [...prev, sentences[index]]);
        setIndex((prevIndex) => prevIndex + 1); // Увеличиваем индекс
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
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
    <div className="container mx-auto">
      <header className="flex justify-between items-center p-4 gap-4">
        <div className="flex gap-4 items-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button onKeyDown={handleButtonKeyDown}>Добавить текст</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Вставьте текст, который хотите прочесть
                </DialogTitle>
                <DialogDescription>
                  Для наилучшего поведения приложения, добавленный текст не
                  должен содержать изображений и других визуальных элементов.
                </DialogDescription>
                <form onSubmit={handleSubmit}>
                  <Textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="max-h-[300px] mb-2"
                  />
                  <Button
                    type="submit"
                    disabled={sentences.length > 0}
                    onKeyDown={handleButtonKeyDown}
                  >
                    Загрузить текст
                  </Button>
                </form>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <p className="font-light">Добавьте текст ✨</p>
        </div>
        <div>
          <ModeToggle />
        </div>
      </header>

      <main className="max-h-screen mt-8">
        <div className="container mx-auto flex justify-center">
          {sentences.length > 0 ? (
            <p className="opacity-80 font-light mb-8">
              Нажмайте <span>ПРОБЕЛ</span>, чтобы текст начал отображаться
            </p>
          ) : (
            ""
          )}
        </div>
        <div
          className="max-w-prose mx-auto overflow-y-auto no-scrollbar p-4"
          style={{ maxHeight: "400px", minHeight: "400px", overflowY: "auto" }}
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
                  ? "bg-yellow-300 rounded-lg"
                  : ""
              }`}
            >
              {sentence}
            </p>
          ))}
        </div>
        <div className="mt-8">
          {sentences.length > 0 && (
            <div className="text-center mb-4 max-w-[400px] mx-auto p-4 ">
              <p className="text-sm text-gray-600 mb-2">{progress}%</p>
              <div className="h-2 w-full bg-gray-300 rounded-full">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}{" "}
        </div>
      </main>
    </div>
  );
}
