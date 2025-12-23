// 2. lib/api/clientApi.ts — для функцій, які викликаються у клієнтських компонентах:

// fetchNotes - OK
// fetchNoteById - OK
// createNote - OK
// deleteNote - OK
// register - OK
// login - OK
// logout
// checkSession
// getMe
// updateMe

'use client';
import axios from 'axios';
import { api } from '@/lib/api/api';
import type { Note, NoteTag } from '@/types/note';
import type { User } from "@/types/user";

// Токен з .env (Next.js)
const NEXT_PUBLIC_NOTEHUB_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export const noteApi = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    Authorization: `Bearer ${NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});
// ---- Типи відповідей ----
export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export type CreateNoteResponse = Note;
export type DeleteNoteResponse = Note;

export interface FetchNotesParams {
  query?: string;
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string | NoteTag | 'all' | undefined | null;
  // tag?: string;
}

export async function fetchNotes(
  params: FetchNotesParams
): Promise<FetchNotesResponse> {
  const queryParams: Record<string, string | number> = {
    // page: params.page,
    // perPage: params.perPage,
  };

  if (params.search) queryParams.search = params.search;
  if (params.tag && params.tag !== 'all') queryParams.tag = params.tag;

  const response = await noteApi.get<FetchNotesResponse>('/notes', {
    params: queryParams,
  });

  return response.data;
}

// Отримання однієї нотатки
export async function fetchNoteById(id: string): Promise<Note> {
  const response = await noteApi.get<Note>(`/notes/${id}`);
  return response.data;
}

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: NoteTag;
}

// Створення нової нотатки
export async function createNote(
  noteData: CreateNoteParams
): Promise<CreateNoteResponse> {
  const response = await noteApi.post<CreateNoteResponse>('/notes', noteData);
  return response.data;
}
export interface DeleteNoteParams {
  id: string;
}
// Видалення нотатки
export async function deleteNote(id: string): Promise<DeleteNoteResponse> {
  const response = await noteApi.delete<DeleteNoteResponse>(`/notes/${id}`);
  return response.data;
}
// ---- Аутентифікація та користувач ----
export interface RegisterProps {
  // username: string;
  email: string;
  password: string;
}
export async function register(data: RegisterProps): Promise<User> {
  const res = await api.post<User>("/auth/register", data);
  return res.data;
}
// Типи для логіну
export interface LoginProps {
  email: string;
  password: string;
}
// Функція для логіну користувача
export async function login(data: LoginProps): Promise<User> {
  const res = await api.post<User>("/auth/login", data);
  return res.data;
}

