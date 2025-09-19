import React from "react";
import { MdClose } from "react-icons/md";

export default function ViewNote({ note, onCloseNote }) {
  if (!note) return null;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">{note.title}</h2>
          <p className="text-sm text-gray-500">
            {new Date(note?.createdAt).toLocaleDateString()}
          </p>
        </div>
        <button
          onClick={onCloseNote}
          className="p-2 rounded-full hover:bg-gray-200 text-gray-600"
        >
          <MdClose size={24} />
        </button>
      </div>

      {/* Rich text content */}
      <div
        className="prose max-w-none text-gray-700"
        dangerouslySetInnerHTML={{ __html: note.content }}
      />

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-4">
        {note.tags?.map((tag) => (
          <span
            key={tag}
            className="text-xs font-medium text-gray-600 bg-green-100 px-2 py-1 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}
