import express from "express";
import {
  createNotes,
  deleteNote,
  findNotes,
  getAllNotes,
  updateNote,
} from "../controller/notesController.js";
const routes = express.Router();

routes.get("/", getAllNotes);
routes.post("/", createNotes);
routes.get("/:name", findNotes);
routes.put("/:id", updateNote);
routes.delete("/:id", deleteNote);

export default routes;
