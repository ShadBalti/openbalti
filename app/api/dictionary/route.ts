import { NextResponse } from 'next/server';
import dictionary from '@/data/dictionary.json';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase() || '';

  const results = dictionary.filter(
    (entry) =>
      entry.word.toLowerCase().includes(query) ||
      entry.meaning.toLowerCase().includes(query) ||
      entry.example.toLowerCase().includes(query)
  );

  return NextResponse.json(results);
}
