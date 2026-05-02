import Note from "../models/Note.js";

export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    console.log("Something Error on getAllNotes", error);
    res.status(500).json({ message: "Internal Error" });
  }
}

export async function findNotes(req, res) {
  try {
    const notes = await Note.find({ title: req.params.name });
    res.status(200).json(notes);
  } catch (error) {
    console.log("Something Error on findNotes", error);
    res.status(500).json({ message: "Internal Error" });
  }
}

export async function createNotes(req, res) {
  try {
    const { title, content } = req.body;
    const newNotes = new Note({ title, content });
    await newNotes.save();
    res.status(201).json(newNotes);
  } catch (error) {
    console.log("Something Error on createNotes", error);
    res.status(500).json({ message: "Internal Error" });
  }
}

export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    await Note.findByIdAndUpdate(req.params.id, {
      title,
      content,
    });
    res.status(200).json("Note has Updated");
  } catch (error) {
    console.log("Something Error on updateNote", error);
    res.status(500).json({ message: "Internal Error" });
  }
}

export async function deleteNote(req, res) {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.status(200).json("Note has Deleted");
  } catch (error) {
    console.log("Something Error on deleteNote", error);
    res.status(500).json({ message: "Internal Error" });
  }
}
