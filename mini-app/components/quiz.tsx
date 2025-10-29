"use client";

import { useState } from "react";
import { QuestionCard } from "./question-card";
import { PrincessCard } from "./princess-card";
import { Share } from "./share";
import { Button } from "./ui/button";

type Answer = {
  princess: string;
};

type Question = {
  text: string;
  options: { label: string; answer: Answer }[];
};

const questions: Question[] = [
  {
    text: "What’s your favorite type of adventure?",
    options: [
      { label: "Exploring icy kingdoms", answer: { princess: "Anna" } },
      { label: "Discovering hidden treasures", answer: { princess: "Belle" } },
      { label: "Sailing the seas", answer: { princess: "Ariel" } },
      { label: "Venturing into the desert", answer: { princess: "Jasmine" } },
    ],
  },
  {
    text: "Which trait describes you best?",
    options: [
      { label: "Brave and determined", answer: { princess: "Mulan" } },
      { label: "Kind and compassionate", answer: { princess: "Belle" } },
      { label: "Curious and adventurous", answer: { princess: "Ariel" } },
      { label: "Independent and strong", answer: { princess: "Jasmine" } },
    ],
  },
  {
    text: "What’s your favorite pastime?",
    options: [
      { label: "Reading books", answer: { princess: "Belle" } },
      { label: "Singing and dancing", answer: { princess: "Ariel" } },
      { label: "Training and strategizing", answer: { princess: "Mulan" } },
      { label: "Exploring new places", answer: { princess: "Anna" } },
    ],
  },
  {
    text: "Which animal would you choose as a companion?",
    options: [
      { label: "A loyal dog", answer: { princess: "Anna" } },
      { label: "A wise owl", answer: { princess: "Belle" } },
      { label: "A playful dolphin", answer: { princess: "Ariel" } },
      { label: "A fierce tiger", answer: { princess: "Jasmine" } },
    ],
  },
  {
    text: "What’s your ideal holiday?",
    options: [
      { label: "A snowy mountain trip", answer: { princess: "Anna" } },
      { label: "A beach vacation", answer: { princess: "Ariel" } },
      { label: "A jungle adventure", answer: { princess: "Mulan" } },
      { label: "A desert safari", answer: { princess: "Jasmine" } },
    ],
  },
];

const princessData: Record<string, { name: string; image: string }> = {
  Anna: { name: "Anna", image: "/images/princesses/anna.png" },
  Belle: { name: "Belle", image: "/images/princesses/belle.png" },
  Ariel: { name: "Ariel", image: "/images/princesses/ariel.png" },
  Jasmine: { name: "Jasmine", image: "/images/princesses/jasmine.png" },
  Mulan: { name: "Mulan", image: "/images/princesses/mulan.png" },
};

export function Quiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const handleAnswer = (answer: Answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      // compute most frequent princess
      const counts: Record<string, number> = {};
      newAnswers.forEach((a) => {
        counts[a.princess] = (counts[a.princess] || 0) + 1;
      });
      const best = Object.entries(counts).reduce((a, b) =>
        b[1] > a[1] ? b : a
      )[0];
      setResult(best);
    }
  };

  if (result) {
    const princess = princessData[result];
    return (
      <div className="flex flex-col items-center gap-4 p-4 bg-white rounded-xl shadow-lg max-w-md w-full animate-fadeIn">
        <h2 className="text-2xl font-semibold">You’re most like {princess.name}!</h2>
        <PrincessCard name={princess.name} image={princess.image} />
        <Share text={`I’m most similar to ${princess.name}! Check out my Disney Princess Quiz.`} />
        <Button onClick={() => { setAnswers([]); setResult(null); setCurrent(0); }}>
          Try again
        </Button>
      </div>
    );
  }

  const question = questions[current];
  return (
    <div className="w-full max-w-md">
      <QuestionCard
        question={question}
        onAnswer={handleAnswer}
      />
    </div>
  );
}
