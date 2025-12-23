'use client';

import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';

import { fetchNotes } from '@/lib/api/clientApi';
// import { fetchNotes } from '@/lib/api';
import css from './NotesPage.module.css';
import Link from 'next/link';

interface Props {
  tag?: string | null;
}

export default function NotesClient({ tag }: Props) {
  const normalizedTag = tag ?? 'all';

  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  const [debouncedSearch] = useDebounce(searchQuery, 400);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', page, debouncedSearch, normalizedTag],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 12,
        search: debouncedSearch || undefined,
        tag: normalizedTag !== 'all' ? normalizedTag : undefined,
      }),
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes ?? [];

  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.container}>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox
            value={searchQuery}
            onSearchChange={value => {
              setSearchQuery(value);
              setPage(1);
            }}
          />
          <Link className={css.button} href="/notes/action/create">
            Create note +
          </Link>
        </header>

        {isError && <p style={{ color: 'red' }}>❌ Failed to load notes</p>}
        {isLoading && <p>Loading...</p>}

        {!isLoading && notes.length > 0 && <NoteList notes={notes} />}
        {!isLoading && notes.length === 0 && <p>No notes found</p>}

        {totalPages > 1 && (
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        )}
      </div>
    </div>
  );
}
