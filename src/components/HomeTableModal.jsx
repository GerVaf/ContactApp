import React from "react";
import { AiOutlineEdit, AiOutlineHeart } from "react-icons/ai";
import { BiTrashAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useDeleteContactMutation } from "../rtk/services/api";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { insertFavContact } from "../rtk/features/contactSlice";
import { closeContactModal } from "../rtk/features/modalSlice";

// const data = [
//   { id: 1, name: "Favourite", icon: <AiOutlineHeart /> },
//   { id: 2, name: "Edit", icon: <AiOutlineEdit /> },
//   { id: 3, name: "Delete", icon: <BiTrashAlt /> },
// ];

const HomeTableModal = ({ item }) => {
  const [deleteContact] = useDeleteContactMutation();
  const { token } = useSelector((state) => state.userSlice.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleDelete = async () => {
    await deleteContact({ id: item.id, token });
    toast.success("Successfully Deleted");
    navigate('/')
  };
  return (
    <div className="border rounded-md bg-white select-none">
      {/* {data.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-3 p-1 px-2 cursor-pointer hover:gradient_color_three"
        >
          <div>{item.icon}</div>
          <h1>{item.name}</h1>
        </div>
      ))} */}
      <div
        onClick={() =>{
          dispatch(insertFavContact(item))
          dispatch(closeContactModal())
        }}
        className="flex items-center gap-3 p-1 px-2 cursor-pointer hover:gradient_color_three"
      >
        <div>
          <AiOutlineHeart />
        </div>
        <h1>Favourite</h1>
      </div>
      <div
        onClick={() => {
          navigate(`/edit/${item.id}`);
        }}
        className="flex items-center gap-3 p-1 px-2 cursor-pointer hover:gradient_color_three"
      >
        <div>
          <AiOutlineEdit />
        </div>
        <h1>Edit</h1>
      </div>
      <div
        onClick={handleDelete}
        className="flex items-center gap-3 p-1 px-2 cursor-pointer hover:gradient_color_three"
      >
        <div>
          <BiTrashAlt />
        </div>
        <h1>Delete</h1>
      </div>
    </div>
  );
};

export default HomeTableModal;
