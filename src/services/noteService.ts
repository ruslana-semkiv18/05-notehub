import axios from "axios";
import type { Note, NoteTag } from "../types/note.ts";

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
  page: number;
  perPage: number;
}

export interface CreateNoteRequest {
  title: string;
  content: string;
  tag: NoteTag;
}

export interface DeleteNoteResponse {
  id: string;
}

const API_KEY = import.meta.env.VITE_NOTEHUB_TOKEN;
axios.defaults.baseURL = "https://notehub-public.goit.study/api";
axios.defaults.headers.common["Authorization"] = `Bearer ${API_KEY}`;

export const fetchNotes = async (
  search: string,
  page: number = 1,
  perPage: number = 12,
): Promise<NotesResponse> => {
  const response = await axios.get<NotesResponse>("/notes", {
    params: { search, page, perPage },
  });

  return response.data;
};

export const createNote = async (
  noteData: CreateNoteRequest,
): Promise<Note> => {
  const response = await axios.post<Note>("/notes", noteData);

  return response.data;
};

export const deleteNote = async (id: string): Promise<DeleteNoteResponse> => {
  const response = await axios.delete<DeleteNoteResponse>(`/notes/${id}`);

  return response.data;
};
