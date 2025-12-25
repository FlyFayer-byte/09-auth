import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './globals.css';
import '@/app/(private routes)/notes/filter/[...slug]/NotesPage.module.css';
import { Metadata } from 'next';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import AuthProvider from '@/components/AuthProvider/AuthProvider';
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
};

interface RootLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${roboto.variable}`}>
        <TanStackProvider>
          <AuthProvider>
            <Header />
            {children}
            <Footer />
            {modal}
            <ReactQueryDevtools initialIsOpen={false} />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
