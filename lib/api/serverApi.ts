import type { AxiosResponse } from 'axios';
import { api } from '@/lib/api/api';
import type { Note } from '@/types/note';
import type { User } from '@/types/user';
import type { FetchNotesParams, FetchNotesResponse } from '@/lib/api/clientApi';

// ---- Нотатки ----
export async function fetchNotesServer(
  params: FetchNotesParams,
  cookies: string
): Promise<FetchNotesResponse> {
  const queryParams: Record<string, string | number> = {};

  if (params.search) queryParams.search = params.search;
  if (params.tag && params.tag !== 'all') queryParams.tag = params.tag;
  if (params.page) queryParams.page = params.page;
  if (params.perPage) queryParams.perPage = params.perPage;

  const res = await api.get<FetchNotesResponse>('/notes', {
    params: queryParams,
    headers: {
      Cookie: cookies,
    },
  });

  return res.data;
}

export async function fetchNoteByIdServer(
  id: string,
  cookies: string
): Promise<Note> {
  const res = await api.get<Note>(`/notes/${id}`, {
    headers: { Cookie: cookies },
  });
  return res.data;
}

// ---- Користувач ----
export async function getMeServer(cookies: string): Promise<User> {
  const res = await api.get<User>('/users/me', {
    headers: { Cookie: cookies },
  });
  return res.data;
}
export async function checkSessionServer(
  cookies: string
): Promise<AxiosResponse<User | null>> {
  const res = await api.get<User | null>('/auth/session', {
    headers: { Cookie: cookies },
  });
  return res;
}
