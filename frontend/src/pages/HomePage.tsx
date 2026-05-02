import AceUITemplateWithSidebar from "../components/template/AceUITemplateWithSidebar";
import AceUICardWithTitle from "../components/card/AceUICardWithTitle";
import AceUIButton from "../components/input/AceUIButton";
import DetailModal from "./DetailModal";
import { useEffect, useState } from "react";
import CreateModal from "./CreateModal";
import UpdateModal from "./UpdateModal";
import Note from "../utils/axios";

function HomePage() {
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<any>(null);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const url = search ? `/${search}` : "/";
      const res = await Note.get(url);
      setNotes(res.data);
    } catch (error) {
      console.log(error);
      if (search) setNotes([]);
    } finally {
      setLoading(false);
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
      {loading ? null : (
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
      )}

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
