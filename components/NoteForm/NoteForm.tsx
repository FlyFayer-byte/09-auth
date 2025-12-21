'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '../../lib/api';
import css from './NoteForm.module.css';
import { useRouter } from 'next/navigation';

interface NoteFormProps {
  onSuccess?: () => void;
}

import { useNoteDraft } from '@/lib/store/noteStore';
import toast from 'react-hot-toast';
import type { AddNote } from '@/types/note';

export default function NoteForm({onSuccess}:NoteFormProps) {
  const queryClient = useQueryClient();

  const router = useRouter();
  const { draft, saveDraft, clearDraft } = useNoteDraft();

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['notes'],
      });
      clearDraft();
      onSuccess?.();
      router.push('/notes/filter/all');
    },
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    saveDraft({ ...draft, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (formData: FormData) => {
    const values = Object.fromEntries(formData) as AddNote;

    if (!values.title.trim()) {
      toast.error('Title is required');
      return;
    }
    if (!values.content.trim()) {
      toast.error('Content is required');
      return;
    }
    mutate(values);
  };
  return (
    <form className={css.form} onSubmit={e => { e.preventDefault(); handleSubmit(new FormData(e.currentTarget))}}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          placeholder="Title"
          id="title"
          name="title"
          className={css.input}
          onChange={handleChange}
          defaultValue={draft?.title}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          rows={8}
          id="content"
          name="content"
          className={css.textarea}
          onChange={handleChange}
          defaultValue={draft?.content}
        ></textarea>
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          onChange={handleChange}
          defaultValue={draft?.tag}
        >
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Todo">Todo</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={() => router.back()}
        >
          Cancel
        </button>

        <button
          type="submit"
          className={css.submitButton}
          disabled={isPending}
        >
          Create note
        </button>
      </div>
    </form>
  );
}
