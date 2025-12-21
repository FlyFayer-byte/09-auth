// -- Інтерфейс для типізації однієї нотатки з API --
export interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string; // дата у форматі ISO
  updatedAt: string; // дата у форматі ISO
}

// Доступні типи тегів нотаток (строго фіксований набір значень)
export type NoteTag =
  | "Todo"
  | "Work"
  | "Personal"
  | "Meeting"
  | "Shopping";

export type AddNote = Omit<Note, 'id'| 'createdAt' | 'updatedAt'>;


export type MetadataProps = {
  params: {
    // id: string;
    slug?: string[];
  };
};