"use client";

import { KeyboardEvent, useEffect, useState, useRef } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

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

  // Обрабатываем нажатие на кнопку "Загрузить текст"
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const sentances = (inputValue ?? "").match(/[^.!?]+[.!?]*/g) || [];
    setSentences(sentances);
    setDisplayedSentences([]); // Сброс отображенных предложений
    setIndex(0); // Сброс индекса
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
  }, [displayedSentences]); // Этот эффект сработает каждый раз, когда отображаются новые предложения

  const handleButtonKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === " ") {
      e.preventDefault(); // Запрещаем обработку пробела на кнопке
    }
  };

  return (
    <div className="container mx-auto">
      <form onSubmit={handleSubmit}>
        <Textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="max-h-[100px]"
        />
        <Button type="submit" onKeyDown={handleButtonKeyDown}>
          Загрузить текст
        </Button>
      </form>
      <div
        className="max-w-prose mx-auto overflow-y-auto no-scrollbar"
        style={{ maxHeight: "300px", overflowY: "auto" }}
      >
        {displayedSentences.map((sentence, index) => (
          <p
            key={index}
            ref={
              index === displayedSentences.length - 1 ? lastParagraphRef : null
            }
            className={`mb-2 px-1 py-1 text-lg ${
              index === displayedSentences.length - 1
                ? "bg-yellow-300 rounded-lg"
                : ""
            }`}
          >
            {sentence}
          </p>
        ))}
      </div>
    </div>
  );
}
