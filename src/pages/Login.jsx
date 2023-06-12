import React, { useState } from "react";
import { TextInput, Checkbox, Button, Group, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useLoginMutation } from "../rtk/services/api";
import { useDispatch } from "react-redux";
import { insertUser } from "../rtk/features/userSlice";
import { toast } from "react-toastify";
import BtnLoading from "../components/BtnLoading";

const Login = () => {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleLoginSubmit = async (e) => {
    try {
      const { data, error } = await login(form.values);
      if (data.success) {
        toast.success("Successfully Log In");
        navigate("/");
        dispatch(insertUser(data));
      }
      if (!data.success) {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="border grid md:grid-cols-2 gap-3 w-full h-screen">
      {/* Log In Form */}
      <div className="flex items-center justify-center font-semibold">
        <Box miw={300}>
          <h1 className="p-3 text-2xl mb-3  ">Log In To Your Account</h1>
          <form
            className="flex flex-col gap-4 px-3 "
            onSubmit={form.onSubmit(handleLoginSubmit)}
          >
            <TextInput
              withAsterisk
              label="Email"
              placeholder="your email"
              {...form.getInputProps("email")}
            />
            <div className="relative">
              <TextInput
                type={`${showPassword ? "text" : "password"}`}
                withAsterisk
                label="Password"
                placeholder="your password "
                {...form.getInputProps("password")}
              />
              {showPassword ? (
                <AiOutlineEye
                  onClick={() => setShowPassword(false)}
                  className="absolute right-1 bottom-0 w-8 h-8 p-1 cursor-pointer text-slate-800"
                />
              ) : (
                <AiOutlineEyeInvisible
                  onClick={() => setShowPassword(true)}
                  className="absolute right-1 bottom-0 w-8 h-8 p-1 cursor-pointer text-slate-800"
                />
              )}
            </div>

            <Group position="right" mt="md">
              {isLoading ? (
                <BtnLoading text={"Log In"} />
              ) : (
                <button
                  type="submit"
                  className="btn border-sky-900 text-sky-900 hover:bg-sky-900 hover:text-white transition_one"
                >
                  Log In
                </button>
              )}
            </Group>
          </form>
        </Box>
      </div>
      {/*  */}
      <div className="bg-gradient-to-r from-[#00B4DB] to-[#0083B0]  flex flex-col items-center justify-center gap-5">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#E0EAFC] to-[#CFDEF3] ">
          New Here
        </h1>
        <p className="text-[#E0EAFC] text-sm md:text-medium max-w-[20rem] text-center font-semibold">
          Sign up and discover a greate amount of new opportunities!
        </p>
        <button
          onClick={() => {
            navigate("/register");
          }}
          className="sign_btn"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Login;
