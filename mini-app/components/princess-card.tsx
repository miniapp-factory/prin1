"use client";

type Props = {
  name: string;
  image: string;
};

export function PrincessCard({ name, image }: Props) {
  return (
    <div className="flex flex-col items-center gap-2">
      <img
        src={image}
        alt={name}
        className="w-32 h-32 rounded-full object-cover shadow-lg"
      />
      <span className="text-lg font-semibold">{name}</span>
    </div>
  );
}
