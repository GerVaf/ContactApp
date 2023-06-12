import React from "react";
import { AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { handleUserModal } from "../rtk/features/modalSlice";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../rtk/services/api";
import { removeUser } from "../rtk/features/userSlice";

const UserModel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { info, token } = useSelector((state) => state.userSlice.user);

  const [logout] = useLogoutMutation();

  const handleLogIn = () => {
    dispatch(handleUserModal());
    navigate("/login");
  };

  const handleLogOut = async () => {
    try {
      const { data, error } = await logout(token);
      if (data) {
        if (data.success) {
          dispatch(handleUserModal());
          dispatch(removeUser());
          onLogout();
        }
      } else {
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="border rounded-md  bg-white  shadow-md min-w-[8rem]">
      {info.id ? (
        <div
          onClick={handleLogOut}
          className="flex items-center gap-3 cursor-pointer select-none hover:gradient_color_three p-2"
        >
          <AiOutlineLogout className="w-8 h-8 p-1" />
          <h1 className="font-semibold">Log Out</h1>
        </div>
      ) : (
        <div
          onClick={handleLogIn}
          className="flex items-center gap-3 cursor-pointer select-none hover:gradient_color_three p-2"
        >
          <AiOutlineLogin className="w-8 h-8 p-1" />
          <h1 className="font-semibold">Log In</h1>
        </div>
      )}
    </div>
  );
};

export default UserModel;
