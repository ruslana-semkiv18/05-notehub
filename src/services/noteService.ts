import axios from "axios";
import type { Note } from "../types/note.ts";

export interface NotesResponse {
  notes: Note[];
  totalPages?: number;
  page?: number;
  perPage?: number;
}

const API_KEY = import.meta.env.VITE_NOTEHUB_TOKEN;
axios.defaults.baseURL = "https://notehub-public.goit.study/api";

export const fetchNotes = async (
  search: string,
  page: number = 1,
  perPage: number = 12,
): Promise<NotesResponse> => {
  const response = await axios.get<NotesResponse>("/notes", {
    params: { search, page, perPage },
    headers: { Authorization: `Bearer ${API_KEY}` },
  });

  return response.data;
};
