import { api } from '@/lib/api/api';
import type { Note } from '@/types/note';
import type { User } from '@/types/user';

// ---- Нотатки ----
export async function fetchNotesServer(cookies: string): Promise<Note[]> {
  const res = await api.get<Note[]>('/notes', {
    headers: { Cookie: cookies },
  });
  return res.data;
}

export async function fetchNoteByIdServer(id: string, cookies: string): Promise<Note> {
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

export async function checkSessionServer(cookies: string): Promise<User | null> {
  const res = await api.get<User | null>('/auth/session', {
    headers: { Cookie: cookies },
  });
  return res.data;
}
