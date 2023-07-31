import React from "react";
import { TextInput, Checkbox, Button, Group, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { useCreateContactMutation } from "../rtk/services/api";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import BtnLoading from "../components/BtnLoading";
import "../components/createform.css";
import createimage from "../images/create.gif";

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
    <div class="container w-[100%] h-[100%] bg-white">
      <div class="form-container">
        <div class="sigin-form active-form">
          < div className="p-2 sm:ml-[160px]  rounded-lg bg-white h-[85vh] sm:w-[100%] w-[100%] border flex mt-20 justify-around">
          <div className=""><img src={createimage} className="h-[60%] mt-24 " /></div>
            <div className="sm:mr-32"><Box miw={300}>
              {/* <h1 className="p-3 text-2xl mb-3  ">Create Contact</h1> */}
              <form
                className="flex flex-col gap-4 px-3"
                onSubmit={form.onSubmit(handleCreate)}
              >
                {/* name */}
                <div className="input-form">
                  <input
                    type="text"
                    name="pseudo"
                    id="pseudo"
                    required
                    placeholder=" "
                    {...form.getInputProps("name")}
                  />
                  <label htmlFor="pseudo">Name</label>
                </div>
                {/* email */}
                <div className="input-form">
                  <input
                    type="text"
                    name="pseudo"
                    id="pseudo"
                    required
                    placeholder=" "
                    {...form.getInputProps("phone")}
                  />
                  <label htmlFor="pseudo">Phone</label>
                </div>
                {/* email */}
                <div className="input-form">
                  <input
                    type="text"
                    name="pseudo"
                    id="pseudo"
                    required
                    placeholder=" "
                    {...form.getInputProps("email")}
                  />
                  <label htmlFor="pseudo">Email</label>
                </div>
                {/* Address */}
                <div className="input-form">
                  <input
                    type="text"
                    name="pseudo"
                    id="pseudo"
                    required
                    placeholder=" "
                    {...form.getInputProps("address")}
                  />
                  <label htmlFor="pseudo">Address</label>
                </div>
                <Group position="center" mt="md">
                  {isLoading ? (
                    <BtnLoading text={"Create"} />
                  ) : (
                    <button
                      type="submit"
                      className="btn border-[#45BD9E] text-[#45BD9E] hover:bg-[#44BE9E] hover:text-white transition_one"
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
            </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
