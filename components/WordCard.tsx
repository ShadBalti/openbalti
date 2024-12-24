import React from 'react';

interface WordCardProps {
  word: {
    id: number;
    word: string;
    meaning: string;
    example: string;
    part_of_speech: string;
    synonyms: string[];
    origin: string;
  };
}

const WordCard: React.FC<WordCardProps> = ({ word }) => {
  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">{word.word}</h2>
      <p className="text-gray-600 text-sm italic mb-2">{word.part_of_speech}</p>
      <p className="text-gray-700 mb-4">
        <span className="font-semibold">Meaning:</span> {word.meaning}
      </p>
      <p className="text-gray-700 mb-4">
        <span className="font-semibold">Example:</span> "{word.example}"
      </p>
      <p className="text-gray-700 mb-4">
        <span className="font-semibold">Synonyms:</span> {word.synonyms.join(', ')}
      </p>
      <p className="text-gray-700">
        <span className="font-semibold">Origin:</span> {word.origin}
      </p>
    </div>
  );
};

export default WordCard;
