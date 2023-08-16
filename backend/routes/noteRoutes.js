const expree = require("express");
const { getNotes, createNote, getNoteById, UpdateNote, DeleteNote, updateNoteStatus, getAllUsersWithNotes } = require("../controllers/noteController");
const { protect } = require("../middlewares/authMiddleware");


const router = expree.Router();

router.route("/").get(protect, getNotes);
router.route("/create").post(protect, createNote);
router.route('/usersWithNotes').get(getAllUsersWithNotes);
router.route("/:id").get(getNoteById).put(protect, UpdateNote).delete(protect, DeleteNote); 
router.route("/:id/noteStatus").put(updateNoteStatus); 
module.exports = router;  