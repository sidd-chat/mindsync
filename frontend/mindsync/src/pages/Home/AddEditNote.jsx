import React, { useState } from "react";
import TagInput from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";

const AddEditNote = ({ noteData, type, onClose }) => {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [tags, setTags] = React.useState([]);

  const [error, setError] = React.useState(null);

  const addNote = async () => {

  }

  const editNote = async () => {

  }

  const handleAddNote = () => {
    if (!title && !content) {
      setError("Both Title and Content Cannot be Empty!");
      return;
    }

    setError("");

    if(type === "edit") {
      editNote();
    } else {
      addNote();
    }
  };

  return (
    <div className="relative">
      <button
        className="w-10 h-10 rounded-xl cursor-pointer flex items-center justify-center absolute -top-0 -right-0 hover:bg-white"
        onClick={onClose}
      >
        <MdClose className="text-xl text-slate-400" />
      </button>

      <div className="flex flex-col gap-2">
        {/* <label className="input-label text-black">TITLE</label> */}
        <input
          type="text"
          className="text-2xl mt-5 text-gray-600 outline-none"
          placeholder="Go to Gym at 5..."
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <br className=""/>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        {/* <label className="input-label">CONTENT</label> */}
        <textarea
          type="text"
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
          placeholder="Write content here..."
          rows={10}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
      </div>

      <div className="mt-10">
        <label className="input-label text-black">TAGS</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

      <button
        className="btn-primary font-medium mt-5 p-3"
        onClick={handleAddNote}
      >
        ADD
      </button>
    </div>
  );
};

export default AddEditNote;
