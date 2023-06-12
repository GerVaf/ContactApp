import React, { useEffect, useState } from "react";
import ContactTable from "../components/ContactTable";
import { useDispatch, useSelector } from "react-redux";
import { useGetContactQuery } from "../rtk/services/api";
import {
  insertContact,
  setSearchContactHome,
} from "../rtk/features/contactSlice";
import { closeContactModal } from "../rtk/features/modalSlice";
import { Pagination } from "@mantine/core";

const Home = () => {
  const [activePage, setPage] = useState(1);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.userSlice.user);
  const { data, isLoading } = useGetContactQuery({ token, page: activePage });

  const { searchContacts } = useSelector((state) => state.contactSlice);
  const { contacts } = useSelector((state) => state.contactSlice);

  useEffect(() => {
    if (!isLoading && data) {
      dispatch(insertContact(data?.contacts.data));
      setPage(data?.contacts.current_page);
    }
    dispatch(closeContactModal());
  }, [data?.contacts.data, isLoading]);

  useEffect(() => {
    if (contacts?.length) {
      dispatch(setSearchContactHome());
    }
  }, [contacts]);

  return (
    <div className="border bg-white h-[85vh] rounded-lg">
      <h1 className="font-semibold italic mb-3 p-2">
        Contacts: {searchContacts?.length}
      </h1>

      <div className="h-[80vh] overflow-y-scroll">
        {searchContacts?.length ? (
          <ContactTable contacts={searchContacts} />
        ) : (
          <div className="p-2 font-semibold text-lg italic">
            Create New Contact
          </div>
        )}
      </div>

      <div className="p-2 items-center flex justify-center">
        {searchContacts.length < 10 ? (
          <></>
        ) : (
          <Pagination
            value={activePage}
            onChange={setPage}
            total={data?.contacts.last_page}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
