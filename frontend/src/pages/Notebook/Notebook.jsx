import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosinstance";
import AddEditNote from "../AddEditNote/AddEditNote";
import Modal from "react-modal";
import { MdPersonAdd, MdAdd } from "react-icons/md";

export default function Notebook() {
  const { id } = useParams();
  const [notes, setNotes] = useState([]);
  const [notebook, setNotebook] = useState(null);
  const [openAddEditModal, setOpenAddEditModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteMsg, setInviteMsg] = useState("");
  const [openInviteModal, setOpenInviteModal] = useState(false);

  const getNotes = async () => {
    const res = await axiosInstance.get(`/api/notebook/${id}/notes`);
    setNotes(res.data.notes || []);
  };

  const getNotebook = async () => {
    const res = await axiosInstance.get(`/api/notebooks`);
    const found = res.data.notebooks.find(nb => nb._id === id);
    setNotebook(found);
  };

  useEffect(() => {
    getNotes();
    getNotebook();
  }, [id]);

  const handleInvite = async (e) => {
    e.preventDefault();
    setInviteMsg("");
    if (!inviteEmail) return;
    try {
      const res = await axiosInstance.post(`/api/notebook/${id}/collaborate`, { email: inviteEmail });
      if (!res.data.error) {
        setInviteMsg("Collaborator invited!");
        setInviteEmail("");
      } else {
        setInviteMsg(res.data.message);
      }
    } catch {
      setInviteMsg("Failed to invite user.");
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">{notebook?.name}</h2>
      <p className="mb-4">{notebook?.description}</p>

      {/* Options Row */}
      <div className="flex gap-4 mb-6">
        <button
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setOpenInviteModal(true)}
        >
          <MdPersonAdd /> Invite Collaborator
        </button>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary/80"
          onClick={() => setOpenAddEditModal(true)}
        >
          <MdAdd /> Create Note
        </button>
      </div>

      {/* Notes List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {notes.filter(note => note.notebookId === id).length === 0 ? (
          <div className="col-span-3 text-center text-gray-500">No notes yet.</div>
        ) : (
          notes.filter(note => note.notebookId === id).map(note => (
            <div key={note._id} className="border p-4 rounded bg-white">
              <h5 className="font-semibold">{note.title}</h5>
              <p>{note.content.replace(/<[^>]+>/g, "")}</p>
            </div>
          ))
        )}
      </div>

      {/* Create Note Modal */}
      <Modal
        isOpen={openAddEditModal}
        onRequestClose={() => setOpenAddEditModal(false)}
        style={{ overlay: { backgroundColor: "rgba(0,0,0,0.6)" } }}
        className="w-[40%] max-h-3/4 rounded-md mx-auto mt-14 overflow-x-hidden p-5 overflow-y-auto"
      >
        <AddEditNote
          type="add"
          noteData={null}
          notebookId={id}
          onClose={() => setOpenAddEditModal(false)}
          getAllNotes={getNotes}
        />
      </Modal>

      {/* Invite Collaborator Modal */}
      <Modal
        isOpen={openInviteModal}
        onRequestClose={() => setOpenInviteModal(false)}
        style={{ overlay: { backgroundColor: "rgba(0,0,0,0.6)" } }}
        className="w-[30%] max-h-1/2 rounded-md mx-auto mt-24 overflow-x-hidden p-5 overflow-y-auto"
      >
        <h3 className="text-xl font-bold mb-4">Invite Collaborator</h3>
        <form onSubmit={handleInvite} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Invite by email"
            value={inviteEmail}
            onChange={e => setInviteEmail(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Send Invite</button>
          {inviteMsg && <span className="text-green-600">{inviteMsg}</span>}
        </form>
      </Modal>
    </div>
  );
}
