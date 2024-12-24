'use client';

import { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import WordCard from '@/components/WordCard';

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (term: string) => {
    setSearchTerm(term);

    try {
      const res = await fetch(`/api/dictionary?q=${term}`);
      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <div className="mt-6 grid gap-4">
        {results.length > 0 ? (
          results.map((word) => <WordCard key={word.id} word={word} />)
        ) : (
          <p className="text-gray-500">No results found for &quot;{searchTerm}&quot;</p>
        )}
      </div>
    </div>
  );
}
