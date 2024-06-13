import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNote from "../AddEditNote/AddEditNote";
import { useState } from "react";
import Modal from "react-modal";

export default function Home() {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  return (
    <>
      <Navbar />

      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-8 ">
          <NoteCard
            title="My Note"
            date="2022-01-01"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            tags={["react", "javascript"]}
            isPinned={true}
            onEdit={() => console.log("Edit Note")}
            onPin={() => console.log("Pin Note")}
            onDelete={() => console.log("Delete Note")}
            onPinNote={() => console.log("Pin Note")}
          />
          <NoteCard
            title="My Note"
            date="2022-01-01"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            tags={["react", "javascript"]}
            isPinned={true}
            onEdit={() => console.log("Edit Note")}
            onPin={() => console.log("Pin Note")}
            onDelete={() => console.log("Delete Note")}
            onPinNote={() => console.log("Pin Note")}
          />
          <NoteCard
            title="My Note"
            date="2022-01-01"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            tags={["react", "javascript"]}
            isPinned={true}
            onEdit={() => console.log("Edit Note")}
            onPin={() => console.log("Pin Note")}
            onDelete={() => console.log("Delete Note")}
            onPinNote={() => console.log("Pin Note")}
          />
          <NoteCard
            title="My Note"
            date="2022-01-01"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            tags={["react", "javascript"]}
            isPinned={true}
            onEdit={() => console.log("Edit Note")}
            onPin={() => console.log("Pin Note")}
            onDelete={() => console.log("Delete Note")}
            onPinNote={() => console.log("Pin Note")}
          />
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
          onClose={() => setOpenAddEditModal({ isShown: false, type: "add", data: null })}
        />
      </Modal>
    </>
  );
}
