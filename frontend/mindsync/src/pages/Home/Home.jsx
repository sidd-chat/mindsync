import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";

const Home = () => {
  const [title, setTitle] = React.useState("");
  const [date, setDate] = React.useState("");
  const [content, setContent] = React.useState("");
  const [isNotePinned, setIsNotePinned] = React.useState(false);
  const [tags, setTags] = React.useState([]);

  const onEdit = () => {
    console.log("Edit Note");
  };

  const onDelete = () => {
    console.log("Delete Note");
  };

  const onPinNote = () => {};

  return (
    <>
      <Navbar />

      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8 px-20">
          <NoteCard
            title="Daily Note 1"
            date="2023-10-01"
            content="This is the content of daily note 1"
            tags={["work", "urgent"]}
            isPinned={false}
            onEdit={onEdit}
            onDelete={onDelete}
            onPinNote={onPinNote}
          />
          <NoteCard
            title="Daily Note 2"
            date="2023-10-02"
            content="This is the content of daily note 2"
            tags={["personal"]}
            isPinned={true}
            onEdit={() => console.log("Edit Note 2")}
            onDelete={() => console.log("Delete Note 2")}
            onPinNote={() => console.log("Pin Note 2")}
          />
          <NoteCard
            title="Daily Note 3"
            date="2023-10-03"
            content="This is the content of daily note 3"
            tags={["work"]}
            isPinned={false}
            onEdit={() => console.log("Edit Note 3")}
            onDelete={() => console.log("Delete Note 3")}
            onPinNote={() => console.log("Pin Note 3")}
          />
        </div>
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-3xl cursor-pointer bg-black hover:bg-yellow-500 hover:rotate-45 absolute right-10 bottom-10 transition-all duration-300 ease-in-out"
        onClick={() => {}}
      >
        <MdAdd className="text-xl text-white" />
      </button>
    </>
  );
};

export default Home;
