import React from "react";
import { AiOutlineHeart, AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { FaRegAddressCard } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteContactMutation } from "../rtk/services/api";
import { toast } from "react-toastify";
import { insertFavContact } from "../rtk/features/contactSlice";
import { closeContactModal } from "../rtk/features/modalSlice";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [deleteContact] = useDeleteContactMutation();
  const { token } = useSelector((state) => state.userSlice.user);
  const { contacts } = useSelector((state) => state.contactSlice);
  const user = contacts.find((item) => item.id === parseInt(id));

  const handleDelete = async () => {
    await deleteContact({ id: user.id, token });
    navigate("../");
    toast.success("Successfully Deleted");
  };

  const navigate = useNavigate();
  return (
    <div className="p-2 bg-white rounded-lg border flex flex-col md:flex-row">
      <BiArrowBack
        onClick={() => navigate("../")}
        className="w-8 h-8 p-1 cursor-pointer"
      />
      <div className="w-full">
        {/* Image Section */}
        <div className="flex flex-col md:flex-row">
          {/* Left Image */}
          <div className="flex flex-col md:flex-row flex-1 items-center gap-5 p-1">
            <img
              className="w-[12rem] h-[12rem] rounded-full object-cover"
              src="https://i.redd.it/d2pivfttqgh91.jpg"
              alt=""
            />
            <h1 className="text-2xl font-semibold">{user?.name}</h1>
          </div>
          {/* Right Icon */}
          <div className="flex  items-center gap-3 p-4">
            <AiOutlineHeart
              onClick={() => {
                dispatch(insertFavContact(user));
                navigate("../");
              }}
              className="w-8 h-8 p-1 cursor-pointer hover:text-red-500 "
            />
            <button
              onClick={() => navigate(`/edit/${user?.id}`)}
              className="btn border-sky-900 text-sky-900 hover:bg-sky-900 hover:text-white transition_one"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="btn border-pink-900 text-pink-900 hover:bg-pink-900 hover:text-white transition_one"
            >
              Delete
            </button>
          </div>
        </div>
        <div className="my-6 px-[5rem]">
          {" "}
          <hr />
        </div>
        {/* Info Section */}
        <div className="mt-5 border rounded-md shadow-md p-5 md:w-1/2 xl:w-1/3">
          <h1 className="text-lg mb-3 font-semibold">Contact Info</h1>
          <div className="flex items-center gap-3 p-1">
            <AiOutlineMail className="w-6 h-6 " />
            <h1>{user?.email}</h1>
          </div>
          <div className="flex items-center gap-3 p-1">
            <AiOutlinePhone className="w-6 h-6 " />
            <h1>{user?.phone}</h1>
          </div>
          <div className="flex items-center gap-3 p-1">
            <FaRegAddressCard className="w-6 h-6 " />
            <h1>{user?.address}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
