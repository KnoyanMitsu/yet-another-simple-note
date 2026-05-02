import axios from "axios";
import AceUIBlankModal from "../components/modal/AceUIBlankModal";

type DetailModalProps = {
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectedNote: any;
  refresh: () => void;
  onEdit: () => void;
};

function DetailModal({
  isOpen,
  onClose,
  selectedNote,
  refresh,
  onEdit,
}: DetailModalProps) {
  const deleteNote = async (id: string) => {
    try {
      const res = await axios.delete(`http://localhost:5001/api/notes/${id}`);
      if (res.status === 200) {
        onClose();
        refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AceUIBlankModal
      isOpen={isOpen}
      onClose={onClose}
      menuPopup={true}
      listMenu={[
        {
          title: "Edit",
          style: "normal",
          onClick: onEdit,
        },
        {
          title: "Delete",
          style: "dangerous",
          onClick: () => deleteNote(selectedNote._id),
        },
      ]}
    >
      {selectedNote && (
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold">
            {selectedNote.title || "Detail Note"}
          </h2>
          <div className="text-text/70 text-sm">
            Created at :{" "}
            {new Date(selectedNote.createdAt).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
          <div className="whitespace-pre-wrap leading-relaxed text-lg">
            {selectedNote.content}
          </div>
        </div>
      )}
    </AceUIBlankModal>
  );
}

export default DetailModal;
