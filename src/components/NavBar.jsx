import  { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { BiX } from "react-icons/bi";
import UserModel from "./UserModel";
import { useDispatch, useSelector } from "react-redux";
import { LeftBarOpen, handleUserModal } from "../rtk/features/modalSlice";
import {
  searchContactFav,
  searchContactHome,
} from "../rtk/features/contactSlice";
import { useLocation } from "react-router-dom";

const NavBar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [search, setSearch] = useState("");
  const { userModal } = useSelector((state) => state.modalSlice);
  const { info } = useSelector((state) => state.userSlice.user);
  const { contacts } = useSelector((state) => state.contactSlice);

  useEffect(() => {
    if (contacts?.length && location.pathname === "/") {
      dispatch(searchContactHome(search));
    }
    if (contacts?.length && location.pathname === "/favourite") {
      dispatch(searchContactFav(search));
    }
  }, [search, contacts]);

  return (
    <div className="border bg-white h-[10vh] p-5 rounded-lg flex">
      {/* toggle */}
      <div onClick={() => dispatch(LeftBarOpen())} className="md:hidden flex items-center mx-3">
        <AiOutlineMenu className="w-8 h-8 p-1 cursor-pointer" />
      </div>
      {/* Search Bar */}
      <div className="bg-slate-200 p-1 rounded-md flex-1 flex items-center relative">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          className="navbar_input"
          placeholder="search:"
        />
        <AiOutlineSearch className="navbar_icon left-0 " />
        <BiX onClick={() => setSearch('')} className="navbar_icon right-0" />
      </div>
      {/* Profile */}
      <div className=" ml-2 sm:ml-6 flex items-center gap-5 relative">
        <h1 className="hidden sm:block font-semibold">{info?.name}</h1>
        <div
          onClick={() => dispatch(handleUserModal())}
          className="image_container "
        >
          <img
            className="w-14 h-14 object-cover rounded-lg"
            src="https://i.pinimg.com/564x/b8/cf/2b/b8cf2b68036c2afdad734e6fde9a0fb6.jpg"
            alt=""
          />
        </div>
        {/* User Model */}
        {userModal && (
          <div className="absolute top-14 right-0">
            <UserModel />
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
