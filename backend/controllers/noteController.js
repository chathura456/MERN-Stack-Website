const Note = require("../models/noteModel"); 
const User = require("../models/userModel"); 
const asyncHandler = require("express-async-handler");

const getNotes = asyncHandler(async (req, res) => {
     const notes = await Note.find({ user: req.user._id });
     res.json(notes);
});

const createNote = asyncHandler(
    async(req,res) => {
        const {title, content, category} = req.body;

        if (!title || !content || !category){
            res.status(400);
            throw new Error("Please Fill all the Fields");
        
        } else{
            const note = new Note({ user: req.user._id, title, content, category,payment:'',status:''});

    const createdNote = await note.save();

    res.status(201).json(createdNote);

        }
    }
);

const getNoteById = asyncHandler(
    async(req,res) => {
         const note = await Note.findById(req.params.id);

  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ message: "Note not found" });
    }
}
);


const UpdateNote = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  const note = await Note.findById(req.params.id);

  if (note.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (note) {
    note.title = title;
    note.content = content;
    note.category = category;

    const updatedNote = await note.save();
    res.json(updatedNote);
  } else {
    res.status(404);
    throw new Error("Note not found");
  }
});

const DeleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    res.status(404);
    throw new Error("Note not found");
  }

  if (note.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  await Note.deleteOne({ _id: req.params.id });
  res.json({ message: "Note removed" });
});

const updateNoteStatus = asyncHandler(
  async (req, res) => {
      const noteId = req.params.id;
      const { status, payment } = req.body;

      const note = await Note.findById(noteId);

      if (!note) {
          res.status(404);
          throw new Error("Note not found");
      }

      // Update the status of the note
      note.status = status;

      // Check if payment is provided and update it
      if (payment !== undefined) {
          note.payment = payment;
      }

      const updatedNote = await note.save();
      res.status(200).json(updatedNote);
  }
);

const getAllUsersWithNotes = asyncHandler(
  async (req, res) => {
      try {
          // Fetch all users and populate their associated note data
          const notesWithUsers = await Note.find().populate('user');


          res.status(200).json(notesWithUsers);
      } catch (error) {
          res.status(500).json({ message: "Error fetching users and notes", error: error.message });
      }
  }
);




module.exports = { getNotes, createNote, getNoteById, UpdateNote, DeleteNote, updateNoteStatus, getAllUsersWithNotes };