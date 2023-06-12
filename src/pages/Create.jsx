import React from "react";
import { TextInput, Checkbox, Button, Group, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { useCreateContactMutation } from "../rtk/services/api";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import BtnLoading from "../components/BtnLoading";

const Create = () => {
  const navigate = useNavigate();
  const [createContact, { isLoading }] = useCreateContactMutation();
  const { token } = useSelector((state) => state.userSlice.user);
  const form = useForm({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });
  const handleCreate = async () => {
    try {
      const formData = form.values;

      const { data, error } = await createContact({ formData, token });

      if (data) {
        toast.success("Successfully Created");
        navigate("/");
      } else {
        toast.error(error.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-2 rounded-lg bg-white h-[85vh] border flex items-center justify-center">
      <Box miw={300}>
        {/* <h1 className="p-3 text-2xl mb-3  ">Create Contact</h1> */}
        <form
          className="flex flex-col gap-4 px-3"
          onSubmit={form.onSubmit(handleCreate)}
        >
          <TextInput
            withAsterisk
            size='lg'
            label="Name"
            placeholder="your name"
            {...form.getInputProps("name")}
          />
          <TextInput
            withAsterisk
            size='lg'
            label="Phone"
            placeholder="your phone number"
            {...form.getInputProps("phone")}
          />
          <TextInput
            withAsterisk
            size='lg'
            label="Email"
            placeholder="your email"
            {...form.getInputProps("email")}
          />
          <TextInput
            withAsterisk
            size='lg'
            label="Address"
            placeholder="your address "
            {...form.getInputProps("address")}
          />

          <Group position="center" mt="md">
            {isLoading ? (
              <BtnLoading text={"Create"} />
            ) : (
              <button
                type="submit"
                className="btn border-sky-900 text-sky-900 hover:bg-sky-900 hover:text-white transition_one"
              >
                Create
              </button>
            )}

            <button
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

export default Create;
