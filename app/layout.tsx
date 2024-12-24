import'./globals.css';
import React from 'react';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'OpenBalti - Explore the Balti Language',
  description:
    'OpenBalti is a comprehensive dictionary for the Balti language, helping you discover words, meanings, and cultural richness.',
  openGraph: {
    title: 'OpenBalti - Explore the Balti Language',
    description:
      'Explore a rich collection of Balti words and their meanings. OpenBalti is your gateway to the cultural and linguistic beauty of Baltistan.',
    url: 'https://openbalti.vercel.app',
    siteName: 'OpenBalti',
    images: [
      {
        url: 'https://openbalti.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'OpenBalti - Balti Language Dictionary'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OpenBalti - Explore the Balti Language',
    description:
      'Discover the beautiful words and culture of Baltistan with OpenBalti.',
    images: ['https://openbalti.vercel.app/twitter-image.jpg']
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <header className="bg-blue-600 text-white p-4">
          <h1 className="text-2xl font-bold">Balti Language Dictionary</h1>
        </header>
        <main className="container mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}
