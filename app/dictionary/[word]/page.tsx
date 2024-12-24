import { notFound } from 'next/navigation';

async function getWordData(word: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/dictionary?q=${word}`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function WordPage({ params }: { params: { word: string } }) {
  const wordData = await getWordData(params.word);

  if (wordData.length === 0) {
    notFound();
  }

  const word = wordData[0];

  return (
    <div>
      <h1 className="text-3xl font-bold">{word.word}</h1>
      <p className="mt-2">{word.meaning}</p>
      <p className="italic mt-4">"{word.example}"</p>
    </div>
  );
}
