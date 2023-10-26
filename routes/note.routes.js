const {Router} = require('express');
const Note = require('../models/Note');
const router = Router();

// /api/note/notes
router.get(
    '/notes', 
    async (req, res) => {
        try {
            const notes = await Note.find({teacher: req.query.id});
            res.json(notes)
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Ошибка' })
        }
})

// /api/note/add
router.post(
    '/add', 
    async (req, res) => {
        try {
            const {note} = req.body;
            console.log(note)

            const newNote = new Note({
                note: note.note, 
                teacher: note.teacher
            });
            await newNote.save();
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Ошибка при добавлении заметки' })
        }
})

// /api/note/delete
router.post(
    '/delete', 
    async (req, res) => {
        try {
            const idNote = req.query.id;
            await Note.deleteOne({_id: idNote});
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Ошибка при удалении заметки' })
        }
})

module.exports = router;