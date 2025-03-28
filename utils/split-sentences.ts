export function splitSentences(inputValue: string): string[] {
  if (!inputValue?.trim()) return [];

  const sentenceSplitRegex = /([.!?]+(?:\s*\[\d+])?)\s*(?=[A-ZА-Я]|$)/g;
  const parts = inputValue.split(sentenceSplitRegex);
  const sentences: string[] = [];

  for (let i = 0; i < parts.length; i += 2) {
    const sentencePart = parts[i];
    const delimiter = parts[i + 1] || "";
    const fullSentence = (sentencePart + delimiter).trim();

    if (fullSentence) {
      sentences.push(fullSentence);
    }
  }

  return sentences;
}
