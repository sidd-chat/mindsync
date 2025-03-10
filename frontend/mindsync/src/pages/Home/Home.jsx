import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import Navbar from "../../components/Navbar/Navbar";

import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";

// import { DndProvider, useDrag, useDrop } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
import AddEditNote from "./AddEditNote";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = React.useState({
    isShow: false,
    type: "add",
    data: null,
  });

  const [title, setTitle] = React.useState("");
  const [date, setDate] = React.useState("");
  const [content, setContent] = React.useState("");
  const [isNotePinned, setIsNotePinned] = React.useState(false);
  const [tags, setTags] = React.useState([]);
  const [search, setSearch] = useState("");

  const [uesrInfo, setUserInfo] = useState(null);

  const navigate = useNavigate();

  const getUserInfo = async () => {
    try{
      const response = await axiosInstance.get("/get-user");

      if(response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch(error) {
      if(error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  }

  useEffect(() => {
    getUserInfo();
    return () => {};
  }, [])


  const onSearch = () => {
    console.log("Search:", search);
  };

  const onEdit = () => {
    console.log("Edit Note");
  };

  const onDelete = () => {
    console.log("Delete Note");
  };

  const onPinNote = () => {};

  return (
    <div className="">
      <Navbar />

      <img src="../../../public/bg4.png" alt="background image" className="absolute z-[-1] h-max w-full top-[6rem] object-fill bg-center bg-repeat"/>

      <div className="container mx-auto">
        {/* <DndProvider backend={HTML5Backend}> */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8 mb-8 px-20">
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
            onEdit={onEdit}
            onDelete={onDelete}
            onPinNote={onPinNote}
          />
          <NoteCard
            title="Daily Note 3"
            date="2023-10-03"
            content="This is the content of daily note 3"
            tags={["work"]}
            isPinned={false}
            onEdit={onEdit}
            onDelete={onDelete}
            onPinNote={onPinNote}
          />
          <NoteCard
            title="Daily Note 3"
            date="2023-10-03"
            content="This is the content of daily note 3"
            tags={["work"]}
            isPinned={false}
            onEdit={onEdit}
            onDelete={onDelete}
            onPinNote={onPinNote}
          />
          <NoteCard
            title="Daily Note 3"
            date="2023-10-03"
            content="This is the content of daily note 3"
            tags={["work"]}
            isPinned={true}
            onEdit={onEdit}
            onDelete={onDelete}
            onPinNote={onPinNote}
          />
          <NoteCard
            title="Daily Note 3"
            date="2023-10-03"
            content="This is the content of daily note 3"
            tags={["work"]}
            isPinned={true}
            onEdit={onEdit}
            onDelete={onDelete}
            onPinNote={onPinNote}
          />
          <NoteCard
            title="Daily Note 3"
            date="2023-10-03"
            content="This is the content of daily note 3"
            tags={["work"]}
            isPinned={true}
            onEdit={onEdit}
            onDelete={onDelete}
            onPinNote={onPinNote}
          />
          <NoteCard
            title="Daily Note 3"
            date="2023-10-03"
            content="This is the content of daily note 3"
            tags={["work"]}
            isPinned={true}
            onEdit={onEdit}
            onDelete={onDelete}
            onPinNote={onPinNote}
          />

        </div>
        {/* </DndProvider> */}
      </div>

      {/* Fix button position!!! */}
      <button
        className="w-16 h-16 flex items-center drop-shadow-lg justify-center rounded-3xl cursor-pointer bg-black hover:bg-yellow-500 hover:rotate-45 sticky bottom-10 right-10 left-350 transition-all duration-300 ease-in-out"
        onClick={() => {
          setOpenAddEditModal({ isShow: true, type: "add", data: null });
        }}
      >
        <MdAdd className="text-2xl text-white" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShow}
        onClose={() =>
          setOpenAddEditModal({ ...openAddEditModal, isShow: false })
        }
        styles={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          },
        }}
        contentLabel=""
        className="w-[60%] bg-gray-100 max-h-3/4 bg-gray mx-auto rounded-md mt-20 py-7 px-10 overflow-auto"
        title={openAddEditModal.type === "add" ? "Add Note" : "Edit Note"}
      >
        <AddEditNote
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({ isShow: false, type: "add",  data:null })
        }}/>
      </Modal>
    </div>
  );
};

export default Home;
