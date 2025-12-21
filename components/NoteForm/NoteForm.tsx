'use client'
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createNote } from '../../lib/api';
// import type { CreateNoteParams } from '../../lib/api';
// import type { AddNote, NoteTag } from '../../types/note';

import css from './NoteForm.module.css';
// import { Router } from 'next/router';
import { useRouter } from 'next/navigation';

interface NoteFormProps {
  onSuccess?: () => void;
}

// Схема валідації
// const validationSchema = Yup.object({
//   title: Yup.string()
//     .min(3, 'Minimum 3 characters')
//     .max(50, 'Maximum 50 characters')
//     .required('Title is required'),
//   content: Yup.string().max(500, 'Maximum 500 characters'),
//   tag: Yup.string()
//     .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'])
//     .required(),
// });
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
        {/* <ErrorMessage name="title" component="p" className={css.error} /> */}
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
        {/* <ErrorMessage name="content" component="p" className={css.error} /> */}
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
        {/* <ErrorMessage name="tag" component="p" className={css.error} /> */}
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={() => router.back()}
          // disabled={isSubmitting}
        >
          Cancel
        </button>

        <button
          type="submit"
          className={css.submitButton}
          disabled={isPending}
        >
          {/* {isSubmitting ? 'Creating...' : 'Create'} */}
          Create note
        </button>
      </div>
    </form>
  );
}
