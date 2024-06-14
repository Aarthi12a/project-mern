import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNote from "../AddEditNote/AddEditNote";
import { useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosinstance";
import Toast from "../../components/Toasts/Toast";

export default function Home() {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showToast, setShowToast] = useState({
    isShown: false,
    message: "",
    type: "add",
  });

  const [userInfo, setUserInfo] = useState(null);
  const [notes, setNotes] = useState([]);

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
  }

  const handleShowToast = (message, type) => {
    setShowToast({ isShown: true, message, type });
  }

  useEffect(() => {
    getUserInfo();
    getAllNotes();
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} />

      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-8 ">
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
              onEdit={() => {handleEditNote(note)}}
              onPin={() => {}}
              onDelete={() => {}}
              onPinNote={() => {}}
            />
          ))}
        </div>
      </div>

      <button
        onClick={() =>
          setOpenAddEditModal({ isShown: true, type: "add", data: null })
        }
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 hover:scale-105 duration-500 absolute right-10 bottom-10 outline-none "
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.6)",
          },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 overflow-x-hidden p-5 overflow-y-auto"
      >
        <AddEditNote
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() =>
            setOpenAddEditModal({ isShown: false, type: "add", data: null })
          }
          getAllNotes={getAllNotes}
        />
      </Modal>

      <Toast
        isShown={showToast.isShown}
        message={showToast.message}
        onClose={() => setShowToast({ isShown: false, message: "", type: "" })}
      />
    </>
  );
}
