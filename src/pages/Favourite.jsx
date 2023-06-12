import React, { useEffect } from "react";
import ContactTable from "../components/ContactTable";
import { useDispatch, useSelector } from "react-redux";
import { useGetContactQuery } from "../rtk/services/api";
import {
  insertContact,
  searchContactFav,
  setSearchContactFav,
} from "../rtk/features/contactSlice";
import { closeContactModal } from "../rtk/features/modalSlice";

const Favourite = () => {
  const dispatch = useDispatch();
  const { favouriteContacts } = useSelector((state) => state.contactSlice);

  const { searchContacts } = useSelector((state) => state.contactSlice);

  useEffect(() => {
    dispatch(setSearchContactFav());
  }, [favouriteContacts]);

  return (
    <div className="border rounded-lg bg-white h-[85vh]">
      <h1 className="font-semibold italic mb-3 p-2">
        Favourite Contacts: {searchContacts?.length}
      </h1>

      {searchContacts?.length ? (
        <ContactTable contacts={searchContacts} />
      ) : (
        <div className="p-2 font-semibold text-lg italic">
          No Favourite Contact
        </div>
      )}
    </div>
  );
};

export default Favourite;
