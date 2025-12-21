'use client';

import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
// import Modal from '@/components/Modal/Modal';
// import NoteForm from '@/components/NoteForm/NoteForm';
// import SidebarNotes from './filter/@sidebar/SidebarNotes';
// import { useRouter } from 'next/navigation';
import { fetchNotes } from '@/lib/api';
import css from './NotesPage.module.css';
import Link from 'next/link';
// import { normalize } from 'path';

interface Props {
  tag?: string | null;
  // Інтерфейс Props містить невикористаний пропс initialNotes,
  // який не є обов’язковим і не входить до очікуваного API цього компонента.
  // Це може спричинити плутанину, тому його слід видалити.

  // initialNotes?: Note[];
}

export default function NotesClient({ tag }: Props) {
  // console.log('>>> NotesClient tag =', tag);
  const normalizedTag = tag ?? 'all';

  // const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  const [debouncedSearch] = useDebounce(searchQuery, 400);

  // const queryClient = useQueryClient();

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

  // const router = useRouter();
  // const handleClose = () => {
  //   // router.back();
  //   setIsOpen(false);
  // };

  return (
    <div className={css.container}>
      {/* <SidebarNotes /> */}
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox
            value={searchQuery}
            onSearchChange={value => {
              setSearchQuery(value);
              setPage(1);
            }}
          />
          <Link className={css.button} href='/notes/action/create'>
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

        {/* {isOpen && (
          <Modal onClose={handleClose}>
            <NoteForm
              onSuccess={() => {
                setIsOpen(false);
                setPage(1);
                queryClient.invalidateQueries({ queryKey: ['notes'] });
              }}
            />
          </Modal>
        )} */}
      </div>
    </div>
  );
}
