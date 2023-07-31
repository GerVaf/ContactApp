import React, { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { AiOutlineEdit, AiOutlineHeart, AiOutlineUser } from "react-icons/ai";
import { BsX } from "react-icons/bs";
import { BsTrash } from "react-icons/bs";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LeftBarClose } from "../rtk/features/modalSlice";
import contactsImage from "../images/con4.gif";
import createImage from "../images/create1.gif";
import favouriteImage from "../images/fav1.gif";

const LeftBar = () => {
  const [active, setActive] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { LeftBarOpen } = useSelector((state) => state.modalSlice);

  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);

  const handleClick = (item) => {
    setActive(item.path);
    navigate(item.path);
    dispatch(LeftBarClose());
  };

  return (
    <div
      className={`border min-w-[14rem] transition_one ${
        LeftBarOpen
          ? "absolute h-screen md:h-[102vh] md:static top-0 left-0 z-[99] bg-white rounded-lg"
          : "absolute h-screen md:h-[102vh] md:static top-0 -left-[100%] z-[99] bg-white rounded-lg"
      }`}
    >
      {/* Top Section */}
      <div className="flex items-center gap-3 p-2">
        <FaUserAlt className="w-10 h-10 p-1 text-[#44BE9E]" />
        <h1 className="text-2xl font-semibold select-none">Contact App</h1>
        <BsX
          onClick={() => dispatch(LeftBarClose())}
          className="md:hidden w-9 h-9 cursor-pointer"
        />
      </div>
      <div className="px-4">
        <hr className="border-gray-400" />
      </div>
      {/* Bottom Section */}
      <div className="mt-4 flex flex-col gap-2">
        {navList.map((item) => (
          <div
            onClick={() => handleClick(item)}
            key={item.id}
            className={`flex items-center gap-3 h-[50px] overflow-hidden group left_bar_nav_div ${
              item.path === active ? "left_bar_nav_div_active" : ""
            }`}
          >
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                className={`border-none ${
                  item.name === "Contacts" ? "w-24 h-24" : "w-24 h-24"
                }`}
              />
            )}
            <h1
              className={`left_bar_text ${
                item.path === active ? "left_bar_text_active" : ""
              } ${item.fontSizeClass} ${item.textSizeClass}`}
            >
              {item.name}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftBar;

/* CSS styles (styles.css) */
const navList = [
  {
    id: 1,
    name: "Contacts",
    path: "/",
    image: contactsImage,
    fontSizeClass: "text-lg",
  },
  {
    id: 2,
    name: "Create",
    path: "/create",
    image: createImage,
    textSizeClass: "text-lg",
  },
  {
    id: 3,
    name: "Favourite",
    path: "/favourite",
    image: favouriteImage,
    textSizeClass: "text-lg",
  },
  // {
  //   id: 4,
  //   name: "Trash",
  //   path: "/trash",
  //   icon: <BsTrash />,
  // },
];
