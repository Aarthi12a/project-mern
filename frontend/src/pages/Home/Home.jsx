import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd, MdViewList, MdViewModule } from "react-icons/md"; // Icons for list/grid toggle
import AddEditNote from "../AddEditNote/AddEditNote";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosinstance";
import Toast from "../../components/Toasts/Toast";
import ViewNote from "../ViewNote/ViewNote";

export default function Home() {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [openViewNoteModal, setOpenViewNoteModal] = useState({
    isShown: false,
    note: null,
  });

  const [showToast, setShowToast] = useState({
    isShown: false,
    message: "",
    type: "add",
  });

  const [userInfo, setUserInfo] = useState(null);
  const [notes, setNotes] = useState([]);
  const [viewMode, setViewMode] = useState("list");
  const navigate = useNavigate();

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/user");
      if (response.data.error) {
        localStorage.removeItem("token");
        navigate("/login");
      }
      if (response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch {}
  };

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-notes");
      if (response.data.notes) {
        setNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditNote = (note) => {
    setOpenAddEditModal({ isShown: true, type: "edit", data: note });
  };

  const handleShowToast = (message, type) => {
    setShowToast({ isShown: true, message, type });
  };

  const handleDeleteNote = async (note) => {
    const noteId = note._id;
    try {
      const response = await axiosInstance.delete(`/delete-note/${noteId}`);
      if (response.data.error) {
        console.log(response.data.error);
        return;
      }
      if (!response.data.error) {
        getAllNotes();
        handleShowToast("Note Deleted Successfully", "delete");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onPinNote = async (note) => {
    const noteId = note._id;
    try {
      const response = await axiosInstance.put(`/pin-note/${noteId}`);
      if (response.data.error) {
        console.log(response.data.error);
        return;
      }
      if (!response.data.error) {
        getAllNotes();
        handleShowToast("Note Pinned Successfully", "add");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async (searchQuery) => {
    try {
      const response = await axiosInstance.get(`/search/${searchQuery}`);
      if (response.data.notes) {
        setNotes(response.data.notes);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleViewNote = (note) => {
    setOpenViewNoteModal({ isShown: true, note });
  };

  useEffect(() => {
    getUserInfo();
    getAllNotes();
  }, []);

  return (
    <>
      <Navbar
        userInfo={userInfo}
        handleSearch={handleSearch}
        getAllNotes={getAllNotes}
      />

      <div className="container mx-auto px-4">
        {/* Toggle View Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() =>
              setViewMode(viewMode === "grid" ? "list" : "grid")
            }
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
          >
            {viewMode === "grid" ? (
              <>
                <MdViewList /> List View
              </>
            ) : (
              <>
                <MdViewModule /> Card View
              </>
            )}
          </button>
        </div>

        {/* Notes */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {notes.map((note) => (
              <NoteCard
                key={note._id}
                title={note.title}
                date={new Date(
                  note?.createdAt || new Date()
                ).toLocaleDateString()}
                content={note.content}
                tags={note.tags}
                isPinned={note.isPinned}
                onEdit={() => {
                  handleEditNote(note);
                }}
                onDelete={() => {
                  handleDeleteNote(note);
                }}
                onPinNote={() => {
                  onPinNote(note);
                }}
                onClick={() => handleViewNote(note)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {notes.map((note) => (
              <div
                key={note._id}
                className="flex justify-between items-center border p-4 rounded-lg bg-white hover:shadow transition cursor-pointer"
                onClick={() => handleViewNote(note)}
              >
                <div className="flex flex-col">
                  <h5 className="text-lg font-semibold text-gray-800">
                    {note.title}
                  </h5>
                  <p
                    className="text-sm text-gray-600 line-clamp-1"
                    dangerouslySetInnerHTML={{ __html: note.content }}
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    className="px-3 py-1 text-sm bg-green-100 text-green-600 rounded hover:bg-green-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditNote(note);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteNote(note);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Note Floating Button */}
      <button
        onClick={() =>
          setOpenAddEditModal({ isShown: true, type: "add", data: null })
        }
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-primary/3 hover:scale-105 duration-500 absolute right-10 bottom-10 outline-none "
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: { backgroundColor: "rgba(0,0,0,0.6)" },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 rounded-md mx-auto mt-14 overflow-x-hidden p-5 overflow-y-auto"
      >
        <AddEditNote
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() =>
            setOpenAddEditModal({ isShown: false, type: "add", data: null })
          }
          getAllNotes={getAllNotes}
          showToast={handleShowToast}
        />
      </Modal>

      {/* View Note Modal */}
      <Modal
        isOpen={openViewNoteModal.isShown}
        onRequestClose={() =>
          setOpenViewNoteModal({ isShown: false, note: null })
        }
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          content: {
            margin: "auto",
            width: "90%",
            maxWidth: "600px",
            borderRadius: "10px",
            padding: "20px",
            overflow: "hidden",
          },
        }}
        contentLabel="View Note"
      >
        <ViewNote
          note={openViewNoteModal.note}
          onCloseNote={() => setOpenViewNoteModal({ isShown: false })}
        />
      </Modal>

      {/* Toast */}
      <Toast
        isShown={showToast.isShown}
        message={showToast.message}
        onClose={() =>
          setShowToast({ isShown: false, message: "", type: "" })
        }
        type={showToast.type}
      />
    </>
  );
}
