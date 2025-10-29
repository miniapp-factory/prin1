"use client";

import { Question } from "./quiz";

type Props = {
  question: Question;
  onAnswer: (answer: { princess: string }) => void;
};

export function QuestionCard({ question, onAnswer }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 animate-slideIn">
      <h3 className="text-xl font-medium mb-4">{question.text}</h3>
      <div className="grid gap-3">
        {question.options.map((opt, idx) => (
          <button
            key={idx}
            className="w-full py-2 px-4 rounded-md bg-indigo-100 hover:bg-indigo-200 transition-colors"
            onClick={() => onAnswer(opt.answer)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
