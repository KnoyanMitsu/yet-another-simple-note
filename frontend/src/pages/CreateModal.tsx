import AceUIBlankModal from "../components/modal/AceUIBlankModal";
import AceUIInput from "../components/input/AceUIInput";
import { useState } from "react";
import AceUIButton from "../components/input/AceUIButton";
import Note from "../utils/axios";
import toast from "react-hot-toast";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  refresh: () => void;
};

function CreateModal({ isOpen, onClose, refresh }: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const createNote = async () => {
    try {
      const data = { title, content };
      const res = await Note.post("/", data);
      if (res.status === 201) {
        toast.success("Note Has Created");
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
        <h1 className="font-bold text-text text-2xl mb-3">Create New Note</h1>
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
        <AceUIButton style="bold" types="submit" onClick={createNote}>
          Create the note
        </AceUIButton>
      </div>
    </AceUIBlankModal>
  );
}

export default CreateModal;
