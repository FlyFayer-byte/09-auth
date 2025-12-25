import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { cookies } from 'next/headers';
import { fetchNotesServer } from '@/lib/api/serverApi';
import NotesClient from './Notes.client';
import type { Metadata } from 'next';

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const tag = resolvedParams.slug?.[0] ?? 'all';

  const formattedFilter = tag.charAt(0).toUpperCase() + tag.slice(1);

  return {
    title: `Notes with tag "${tag}" | NoteHub`,
    description: `Browse ${tag} notes in NoteHub. Filter and manage your notes by category.`,
    openGraph: {
      title: `${formattedFilter} notes | NoteHub`,
      description: `View and manage ${tag} notes in the NoteHub application.`,
      url: `https://08-zustand-beta-brown.vercel.app/notes/filter/${tag}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `${formattedFilter} notes`,
        },
      ],
    },
  };
}

export default async function Notes({ params }: PageProps) {
  const resolvedParams = await params;

  const slug = resolvedParams.slug?.[0] ?? 'all';
  const tag = slug === 'all' ? undefined : slug;

  const queryClient = new QueryClient();

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', tag],
    queryFn: () =>
      fetchNotesServer(
        {
          page: 1,
          perPage: 12,
          search: '',
          tag,
        },
        cookieHeader
      ),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag ?? 'all'} />
    </HydrationBoundary>
  );
}
