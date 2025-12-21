'use client';

import {useQuery} from '@tanstack/react-query';
import {fetchNoteById} from '@/lib/api';
import css from './NoteDetails.module.css';
import type { Note } from '@/types/note';

interface NoteDetailsClientProps {
  noteId: string;
}

export default function NoteDetailsClient({ noteId }: NoteDetailsClientProps) {
  const { data: note, isLoading, isError } = useQuery<Note>({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError || !note) {
    return <div>Error loading note.</div>;
  }
  
  const formattedDate = new Date(note.createdAt).toLocaleString('uk-UA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.content}>{ note.tag}</p>
        <p className={css.date}>{formattedDate}</p>
      </div>
    </div>
  );
}
