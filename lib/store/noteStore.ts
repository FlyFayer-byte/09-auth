import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { AddNote } from '@/types/note';

interface NoteDraftProps {
  draft: AddNote;
  saveDraft: (data: AddNote) => void;
  clearDraft: () => void;
}

const initialDraft: AddNote = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteDraft = create<NoteDraftProps>()(
  persist(
    set => ({
      draft: initialDraft,
      saveDraft: data => set({ draft: data }),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    { name: 'note-draft', partialize: state => ({ draft: state.draft }) }
  )
);