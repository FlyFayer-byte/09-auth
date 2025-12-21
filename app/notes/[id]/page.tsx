import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import type { Metadata } from 'next';

import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const note = await fetchNoteById(params.id);

    const description =
      note.content.length > 120 ? note.content.slice(0, 120) + '...' : note.content;

    return {
      title: `${note.title} | NoteHub`,
      description,
      openGraph: {
        title: `${note.title} | NoteHub`,
        description,
        url: `https://08-zustand-beta-brown.vercel.app/notes/${params.id}`,
        images: [
          {
            url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
            width: 1200,
            height: 630,
            alt: note.title,
          },
        ],
      },
    };
  } catch {
    return {
      title: 'Note not found | NoteHub',
      description: 'The requested note does not exist.',
    };
  }
}

export default async function NoteDetailsPage({ params }: PageProps) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', params.id],
    queryFn: () => fetchNoteById(params.id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient noteId={params.id} />
    </HydrationBoundary>
  );
}
