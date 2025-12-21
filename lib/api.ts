import axios from 'axios';
import type { Note, NoteTag } from '@/types/note';

// Токен з .env (Next.js)
const NEXT_PUBLIC_NOTEHUB_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export const noteApi = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

// -- Виконує запит для отримання колекції нотаток із сервера
export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
  tag?: string | NoteTag | 'all' | undefined | null;
}

export async function fetchNotes(
  params: FetchNotesParams
): Promise<FetchNotesResponse> {
  const queryParams: Record<string, string | number> = {
    page: params.page,
    perPage: params.perPage,
  };

  if (params.search) queryParams.search = params.search;
  if (params.tag && params.tag !== 'all') queryParams.tag = params.tag;

  const response = await noteApi.get<FetchNotesResponse>('/notes', {
    params: queryParams,
  });

  return response.data;
}

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: NoteTag;
}

export interface DeleteNoteParams {
  id: string;
}

// ---- Типи відповідей ----
export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export type CreateNoteResponse = Note;
export type DeleteNoteResponse = Note;

// ---- API функції ----



// Отримання однієї нотатки
export async function fetchNoteById(id: string): Promise<Note> {
  const response = await noteApi.get<Note>(`/notes/${id}`);
  return response.data;
}

// Створення нової нотатки
export async function createNote(
  noteData: CreateNoteParams
): Promise<CreateNoteResponse> {
  const response = await noteApi.post<CreateNoteResponse>('/notes', noteData);
  return response.data;
}

// Видалення нотатки
export async function deleteNote(id: string): Promise<DeleteNoteResponse> {
  const response = await noteApi.delete<DeleteNoteResponse>(`/notes/${id}`);
  return response.data;
}