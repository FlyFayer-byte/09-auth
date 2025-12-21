import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './globals.css';
import '@/app/notes/filter/[...slug]/NotesPage.module.css';
import { Metadata } from 'next';
// import { Geist, Geist_Mono } from 'next/font/google';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

// const geistSans = Geist({
//   variable: '--font-geist-sans',
//   subsets: ['latin'],
// });

// const geistMono = Geist_Mono({
//   variable: '--font-geist-mono',
//   subsets: ['latin'],
// });
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NoteHub — Smart Notes Application',
  description:
    'NoteHub is a modern note-taking application built with Next.js. Create, organize, filter, and manage your notes efficiently.',
  openGraph: {
    title: 'NoteHub — Smart Notes Application',
    description:
      'Create, organize, and manage your notes easily with NoteHub — a modern note-taking app built with Next.js.',
    url: 'https://08-zustand-beta-brown.vercel.app',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub application preview',
      },
    ],
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    // console.log(`1. app/layout.tsx - function RootLayout return <html> => <body>`),
    <html lang="en">
      <body className={`${roboto.variable}`}>
        <TanStackProvider>
          <Header />
          {children}
          <Footer />
          {modal}
          <ReactQueryDevtools initialIsOpen={false}/>
        </TanStackProvider>
      </body>
    </html>
  );
}
