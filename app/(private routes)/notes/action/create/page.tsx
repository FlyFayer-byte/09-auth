import css from './CreateNote.module.css';
import NoteForm  from '@/components/NoteForm/NoteForm';
import { Metadata } from 'next';

const title = 'Create new note | NoteHub';
const description =
  'Create a new note in NoteHub. Add a title, content, and select a category to organize your notes.';
const url = 'https://08-zustand-beta-brown.vercel.app/notes/action/create';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description: 'Create and save a new note in the NoteHub application.',
    url,
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Create new note',
      },
    ],
  },
};


export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
        
      </div>
    </main>
  );
}