/* eslint-disable react-hooks/set-state-in-effect */
import AceUIBlankModal from "../components/modal/AceUIBlankModal";
import AceUIInput from "../components/input/AceUIInput";
import { useState, useEffect } from "react";
import AceUIButton from "../components/input/AceUIButton";
import toast from "react-hot-toast";
import Note from "../utils/axios";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  refresh: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectedNote: any;
};

function UpdateModal({ isOpen, onClose, refresh, selectedNote }: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title || "");
      setContent(selectedNote.content || "");
    }
  }, [selectedNote, isOpen]);

  const updateNote = async () => {
    try {
      const data = { title, content };
      const res = await Note.put(`/${selectedNote._id}`, data);
      if (res.status === 200) {
        toast.success("Note Has Updated");
        onClose();
        refresh();

        setTitle("");
        setContent("");
      } else {
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AceUIBlankModal isOpen={isOpen} onClose={onClose}>
      <div className="mb-5">
        <h1 className="font-bold text-text text-2xl mb-3">Update Note</h1>
      </div>
      <div>
        <AceUIInput
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title what you want?"
          type="text"
        />
        <AceUIInput
          label="Description"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Tell me some story"
          type="textarea"
        />
      </div>
      <div className="grid mx-auto col-span-1 mt-4">
        <AceUIButton style="bold" types="button" onClick={updateNote}>
          Update Note
        </AceUIButton>
      </div>
    </AceUIBlankModal>
  );
}

export default UpdateModal;
