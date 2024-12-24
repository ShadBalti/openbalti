import React from 'react';
import dictionary from '@/data/dictionary.json';

// Define the params type for the dynamic route
interface WordPageProps {
  params: {
    word: string;
  };
}

const WordPage: React.FC<WordPageProps> = ({ params }) => {
  const { word } = params;

  // Find the word in the dictionary
  const wordData = dictionary.find((entry) => entry.word.toLowerCase() === word.toLowerCase());

  if (!wordData) {
    return (
      <div className="container mx-auto text-center py-10">
        <h1 className="text-3xl font-bold text-red-500">Word not found</h1>
        <p className="text-gray-600 mt-4">
          The word <span className="font-semibold">{word}</span> is not in our dictionary.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{wordData.word}</h1>
        <p className="text-gray-600 text-sm italic mb-2">{wordData.part_of_speech}</p>
        <p className="text-gray-700 mb-4">
          <span className="font-semibold">Meaning:</span> {wordData.meaning}
        </p>
        <p className="text-gray-700 mb-4">
          <span className="font-semibold">Example:</span> &quot;{wordData.example}&quot;
        </p>
        <p className="text-gray-700 mb-4">
          <span className="font-semibold">Synonyms:</span> {wordData.synonyms.join(', ')}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Origin:</span> {wordData.origin}
        </p>
      </div>
    </div>
  );
};

export default WordPage;