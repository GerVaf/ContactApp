import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import HomeTableModal from "./HomeTableModal";
import { useDispatch, useSelector } from "react-redux";
import { handleContactModal } from "../rtk/features/modalSlice";
import { useNavigate } from "react-router-dom";

// const dummy = [
//   {
//     id: 1,
//     name: "naruto",
//     email: "naruto@gmail.com",
//     phone: "09 957690269",
//     image:
//       "https://sm.ign.com/t/ign_in/photo/default/3-naruto-1660779038828_9te5.1280.jpg",
//   },
//   {
//     id: 2,
//     name: "sasuke",
//     email: "sasuke@gmail.com",
//     phone: "09 957690269",
//     image:
//       "https://cdn.pixabay.com/photo/2020/11/14/19/52/sasuke-5743769_1280.png",
//   },
//   {
//     id: 3,
//     name: "sakura",
//     email: "sakura@gmail.com",
//     phone: "09 957690269",
//     image:
//       "https://www.nautiljon.com/images/perso/00/71/haruno_sakura_617.webp",
//   },
// ];

const ContactTable = ({contacts}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { contactModal } = useSelector((state) => state.modalSlice);
  // const { contacts } = useSelector((state) => state.contactSlice);
  return (
    <table class="table-auto w-full select-none ">
      <thead className="text-left bg-[#44BE9E]">
        <tr>
          <th></th>
          <th className="table_item text-white">Name</th>
          <th className="table_item hidden sm:table-cell text-white">Email</th>
          <th className="table_item hidden md:table-cell text-white">Phone</th>
          <th className="table_item hidden md:table-cell text-white">Address</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {contacts?.map((item) => (
          <tr
            key={item.id}
            className="relative cursor-pointer  hover:gradient_color_three"
          >
            <td className="p-1 w-[4rem] h-[4rem] ">
              {" "}
              <img
                onClick={() => navigate(`/contacts/${item?.id}`)}
                src={
                  "https://i.pinimg.com/564x/91/d7/14/91d7148e0b7a29aca7a6e7aca6829dfe.jpg"
                }
                className=" w-14 h-14 object-cover rounded-lg "
              />
            </td>
            <td
              onClick={() => navigate(`/contacts/${item?.id}`)}
              className="table_item"
            >
              {item?.name}
            </td>
            <td
              onClick={() => navigate(`/contacts/${item?.id}`)}
              className="table_item hidden sm:table-cell"
            >
              {item?.email}
            </td>
            <td
              onClick={() => navigate(`/contacts/${item?.id}`)}
              className="table_item hidden md:table-cell"
            >
              {item?.phone}
            </td>
            <td
              onClick={() => navigate(`/contacts/${item?.id}`)}
              className="table_item hidden md:table-cell"
            >
              {item?.address}
            </td>
            <td
              onClick={() => dispatch(handleContactModal(item.id))}
              className="table_item w-[2rem] z-10   cursor-pointer"
            >
              <BsThreeDotsVertical />
            </td>
            {contactModal.isOpen && contactModal.id === item?.id ? (
              <div className="absolute top-12 right-3 z-10">
                <HomeTableModal item={item} />
              </div>
            ) : (
              <></>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ContactTable;
