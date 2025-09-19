const express = require('express');
const router = express.Router();
const Notebook = require('./models/notebook.model');
const { authenticationToken } = require('./utilities');
const Note = require('./models/note.model');
const User = require('./models/user.model');

// Create notebook
router.post('/create-notebook', authenticationToken, async (req, res) => {
  const { name, description } = req.body;
  const { user } = req.user;
  if (!name) return res.status(400).json({ error: true, message: 'Notebook name required.' });
  const notebook = new Notebook({ name, description, owner: user._id });
  await notebook.save();
  return res.json({ error: false, notebook, message: 'Notebook created.' });
});

// Get all notebooks for user
router.get('/notebooks', authenticationToken, async (req, res) => {
  const { user } = req.user;
  const notebooks = await Notebook.find({ $or: [ { owner: user._id }, { collaborators: user._id } ] });
  return res.json({ error: false, notebooks });
});

// Get notes for a notebook
router.get('/notebook/:id/notes', authenticationToken, async (req, res) => {
  const { user } = req.user;
  const notebookId = req.params.id;
  const notes = await Note.find({ notebookId, userId: user._id });
  return res.json({ error: false, notes });
});

// Add collaborator by email
router.post('/notebook/:id/collaborate', authenticationToken, async (req, res) => {
  const notebookId = req.params.id;
  const { email } = req.body;
  const userToAdd = await User.findOne({ email });
  if (!userToAdd) return res.status(404).json({ error: true, message: 'User not found.' });
  const notebook = await Notebook.findById(notebookId);
  if (!notebook) return res.status(404).json({ error: true, message: 'Notebook not found.' });
  if (!notebook.collaborators.includes(userToAdd._id)) {
    notebook.collaborators.push(userToAdd._id);
    await notebook.save();
  }
  return res.json({ error: false, notebook, message: 'Collaborator added.' });
});

module.exports = router;
