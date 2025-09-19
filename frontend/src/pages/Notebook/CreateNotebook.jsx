import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosinstance";

export default function CreateNotebook() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/api/create-notebook", { name, description });
      if (!res.data.error) {
        navigate(`/notebook/${res.data.notebook._id}`);
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError("Failed to create notebook.");
    }
  };

  return (
    <div className="container mx-auto px-4 mt-10 max-w-lg">
      <h2 className="text-2xl font-bold mb-4">Create Notebook</h2>
      <form onSubmit={handleCreate} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Notebook Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="border p-2 rounded"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="px-4 py-2 bg-primary text-white rounded">Create</button>
      </form>
    </div>
  );
}
