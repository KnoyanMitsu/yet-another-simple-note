import AceUITemplateWithSidebar from "../components/template/AceUITemplateWithSidebar";
import AceUICardWithTitle from "../components/card/AceUICardWithTitle";
import AceUIButton from "../components/input/AceUIButton";
import DetailModal from "./DetailModal";
import { useEffect, useState } from "react";
import axios from "axios";
import CreateModal from "./CreateModal";
import UpdateModal from "./UpdateModal";

function HomePage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const fetchNotes = async () => {
    try {
      const url = search
        ? `http://localhost:5001/api/notes/${search}`
        : "http://localhost:5001/api/notes/";
      const res = await axios.get(url);
      setNotes(res.data);
    } catch (error) {
      console.log(error);
      if (search) setNotes([]);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchNotes();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <AceUITemplateWithSidebar
      searchBar
      searchValue={search}
      addButton
      buttonFunc={() => {
        setIsCreateOpen(true);
      }}
      titleButton="New Note"
      appname="Note"
      onSearchChange={(e) => setSearch(e.target.value)}
      buttonBottomRight
      funcButtomBottomRight={() => {
        setIsCreateOpen(true);
      }}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {notes.map((item, index) => (
          <AceUICardWithTitle title={item.title} key={index}>
            <div className="flex flex-col h-full">
              <div className="mb-5 grow">
                {item.content.substring(0, 200)}
              </div>
              <div className="flex items-center justify-between mt-auto">
                <p className="font-bold text-text/30">
                  {new Date(item.createdAt).toLocaleDateString("id-ID")}
                </p>
                <AceUIButton
                  types="button"
                  onClick={() => {
                    setSelectedNote(item);
                    setIsDetailOpen(true);
                  }}
                >
                  Detail
                </AceUIButton>
              </div>
            </div>
          </AceUICardWithTitle>
        ))}
      </div>
      <DetailModal
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false);
          setSelectedNote(null);
        }}
        selectedNote={selectedNote}
        refresh={fetchNotes}
        onEdit={() => {
          setIsDetailOpen(false); // Tutup Detail Modal
          setIsUpdateOpen(true); // Buka Update Modal
        }}
      />

      <CreateModal
        refresh={fetchNotes}
        isOpen={isCreateOpen}
        onClose={() => {
          setIsCreateOpen(false);
        }}
      />

      <UpdateModal
        refresh={fetchNotes}
        isOpen={isUpdateOpen}
        onClose={() => {
          setIsUpdateOpen(false);
        }}
        selectedNote={selectedNote}
      />
    </AceUITemplateWithSidebar>
  );
}

export default HomePage;
