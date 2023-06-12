import React from "react";
import { TextInput, Group, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate, useParams } from "react-router-dom";
import { useEditContactMutation } from "../rtk/services/api";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import BtnLoading from "../components/BtnLoading";

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { contacts } = useSelector((state) => state.contactSlice);

  const user = contacts.find((item) => item.id === parseInt(id));

  const [editContact, { isLoading }] = useEditContactMutation();
  const { token } = useSelector((state) => state.userSlice.user);
  const form = useForm({
    initialValues: {
      name: user?.name,
      phone: user?.phone,
      email: user?.email,
      address: user?.address,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleEdit = async () => {
    try {
      const formData = form.values;

      const { data, error } = await editContact({
        id: user.id,
        formData,
        token,
      });

      if (data) {
        toast.success("Successfully Edited");
        navigate("../");
      } else {
        toast.error(error.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-2 border w-full h-full flex items-center justify-center">
      <Box miw={300}>
        {/* <h1 className="p-3 text-2xl mb-3  ">Create Contact</h1> */}
        <form
          className="flex flex-col gap-4 px-3"
          onSubmit={form.onSubmit(handleEdit)}
        >
          <TextInput
            withAsterisk
            label="Name"
            placeholder="your name"
            {...form.getInputProps("name")}
          />
          <TextInput
            withAsterisk
            label="Phone"
            placeholder="your phone number"
            {...form.getInputProps("phone")}
          />
          <TextInput
            withAsterisk
            label="Email"
            placeholder="your email"
            {...form.getInputProps("email")}
          />
          <TextInput
            withAsterisk
            label="Address"
            placeholder="your address "
            {...form.getInputProps("address")}
          />

          <Group position="center" mt="md">
            {isLoading ? (
              <BtnLoading text={"Confirm"} />
            ) : (
              <button
                type="submit"
                className="btn border-sky-900 text-sky-900 hover:bg-sky-900 hover:text-white transition_one"
              >
                Confirm
              </button>
            )}

            <button
              type="button"
              onClick={() => navigate("../")}
              className="btn border-red-900 text-red-900 hover:bg-red-900 hover:text-white transition_one"
            >
              Cancel
            </button>
          </Group>
        </form>
      </Box>
    </div>
  );
};

export default Edit;
