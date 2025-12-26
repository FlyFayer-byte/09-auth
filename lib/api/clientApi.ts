'use client';

import { api } from '@/lib/api/api';
import type { Note, NoteTag } from '@/types/note';
import type { User } from '@/types/user';

// ---- Типи відповідей ----
export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: string | NoteTag | 'all' | undefined | null;
}

// ---- Нотатки ----
export async function fetchNotes(params: FetchNotesParams): Promise<FetchNotesResponse> {
  const queryParams: Record<string, string | number> = {};
  if (params.search) queryParams.search = params.search;
  if (params.tag && params.tag !== 'all') queryParams.tag = params.tag;
  if (params.page) queryParams.page = params.page;
  if (params.perPage) queryParams.perPage = params.perPage;

  const response = await api.get<FetchNotesResponse>('/notes', { params: queryParams });
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
}

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: NoteTag;
}

export async function createNote(noteData: CreateNoteParams): Promise<Note> {
  const response = await api.post<Note>('/notes', noteData);
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
}

// ---- Аутентифікація ----
export interface RegisterProps {
  email: string;
  password: string;
}

export async function register(data: RegisterProps): Promise<User> {
  const res = await api.post<User>('/auth/register', data);
  return res.data;
}

export interface LoginProps {
  email: string;
  password: string;
}

export async function login(data: LoginProps): Promise<User> {
  const res = await api.post<User>('/auth/login', data);
  return res.data;
}

export async function logout(): Promise<void> {
  await api.post('/auth/logout');
}

export async function checkSession(): Promise<User | null> {
  const res = await api.get<{ success: boolean; user?: User }>('/auth/session');

  if (res.data.success && res.data.user) {
    return res.data.user;
  }

  return null;
}


export async function getMe(): Promise<User> {
  const res = await api.get<User>('/users/me');
  return res.data;
}

export async function updateMe(data: Partial<User>): Promise<User> {
  const res = await api.patch<User>('/users/me', data);
  return res.data;
}
