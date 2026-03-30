import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../services/noteService";
//import type { Note } from "../../types/note";
import Pagination from "../Pagination/Pagination";
import NoteList from "../NoteList/NoteList";
import SearchBox from "../SearchBox/SearchBox";
import css from "./App.module.css";
import Modal from "../Modal/Modal";

export default function App() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["note", searchQuery, currentPage],
    queryFn: () => fetchNotes(searchQuery, currentPage),
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes || [];
  const totalPages = data?.totalPages || 0;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (nextPage: number) => {
    setCurrentPage(nextPage);
  };

  // const handleCreateNote=()=> {

  // }

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchQuery} onSearch={handleSearch} />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
        <button onClick={openModal} type="button" className={css.button}>
          Create note +
        </button>
      </header>
      <main>
        {isLoading && <p className={css.status}>Loading notes...</p>}
        {isError && <p className={css.error}>"Something went wrong"</p>}
        {!isLoading && notes.length > 0 && <NoteList notes={notes} />}
        {isModalOpen && <Modal onClose={closeModal} />}
      </main>
    </div>
  );
}
