import React from "react";
import { useState } from "react";
import TagInput from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";

export default function AddEditNote({onClose, noteData, type}) {
  
    const [tags, setTags] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [error, setError] = useState(null);

    const addNewNote = () => {

    }

    const editNote = () => {
        
    }

    const handleAddNote = () => {
        if (!title.trim() || !content.trim()) {
            setError("Please fill all the fields")
            return;
        }

        setError(null)

        if (type === "add") {
            console.log("Adding Note");
            addNewNote()
        }

        if (type === "edit") {
            console.log("Editing Note");
            editNote()
        }
    }
  
    return (
    <>
      <div className="relative">


<button className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50" onClick={onClose}>
    <MdClose className="text-xl text-slate-400 cursor-pointer"/>
</button>

        <div className="flex flex-col gap-2">
          <label className="Input-lable">TITLE</label>
          <input
            type="text"
            className="text-2xl text-slate-950 outline-none"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2 mt-4">
            <label className="input-lable">CONTENT</label>
            <textarea
                type="text"
                className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
                placeholder="Enter Content"
                rows={10}
                value={content}
                onChange={(e) => setContent(e.target.value)}
            >

            </textarea>
        </div>


        <div className="mt-3">
            <label className="input-lable">TAGS</label>
            <TagInput tags={tags} setTags={setTags}/>
        </div>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}


        <button className="btn-primary font-medium mt-5 p-3" onClick={handleAddNote}>
            ADD
        </button>
      </div>
    </>
  );
}
