import React, { useState } from "react";
import { TextInput, Checkbox, Button, Group, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useRegisterMutation } from "../rtk/services/api";
import BtnLoading from "../components/BtnLoading";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState({ p: false, cp: false });
  const [register, { isLoading }] = useRegisterMutation();
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length > 7 ? null : "Password must be at least 8 characters. ",

      password_confirmation: (value) =>
        value === form.values.password ? null : "Password Not Match",
    },
  });

  const handleRegisterSubmit = async () => {
    try {
      const { data, error } = await register(form.values);
      if (data) {
        toast.success("Account Created Successfully");
        navigate("/login");
      }
      if (error) {
        toast.error(error.data.message);
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
          <h1 className="p-3 text-2xl mb-3  ">Register New Account</h1>
          <form
            className="flex flex-col gap-4 px-3 "
            onSubmit={form.onSubmit(handleRegisterSubmit)}
          >
            <TextInput
              withAsterisk
              label="Name"
              placeholder="your name"
              {...form.getInputProps("name")}
            />
            <TextInput
              withAsterisk
              label="Email"
              placeholder="your email"
              {...form.getInputProps("email")}
            />
            <div className="relative">
              <TextInput
                type={`${showPassword.p ? "text" : "password"}`}
                withAsterisk
                label="Password"
                placeholder="your password "
                {...form.getInputProps("password")}
              />
              {showPassword.p ? (
                <AiOutlineEye
                  onClick={() => setShowPassword({ ...showPassword, p: false })}
                  className={`absolute right-1 w-8 h-8 p-1 cursor-pointer text-slate-800 ${
                    form.errors.password ? " bottom-5" : " bottom-0"
                  }`}
                />
              ) : (
                <AiOutlineEyeInvisible
                  onClick={() => setShowPassword({ ...showPassword, p: true })}
                  className={`absolute right-1 w-8 h-8 p-1 cursor-pointer text-slate-800 ${
                    form.errors.password ? " bottom-5" : " bottom-0"
                  }`}
                />
              )}
            </div>
            <div className="relative">
              <TextInput
                type={`${showPassword.cp ? "text" : "password"}`}
                withAsterisk
                label="Password Confirmation"
                placeholder="confirm password "
                {...form.getInputProps("password_confirmation")}
              />
              {showPassword.cp ? (
                <AiOutlineEye
                  onClick={() =>
                    setShowPassword({ ...showPassword, cp: false })
                  }
                  className={`absolute right-1 w-8 h-8 p-1 cursor-pointer text-slate-800 ${
                    form.errors.password_confirmation
                      ? " bottom-5"
                      : " bottom-0"
                  }`}
                />
              ) : (
                <AiOutlineEyeInvisible
                  onClick={() => setShowPassword({ ...showPassword, cp: true })}
                  className={`absolute right-1 w-8 h-8 p-1 cursor-pointer text-slate-800 ${
                    form.errors.password_confirmation
                      ? " bottom-5"
                      : " bottom-0"
                  }`}
                />
              )}
            </div>

            <Group position="right" mt="md">
              {isLoading ? (
                <BtnLoading text={"Register"} />
              ) : (
                <button
                  type="submit"
                  className="btn border-sky-900 text-sky-900 hover:bg-sky-900 hover:text-white transition_one"
                >
                  Register
                </button>
              )}
            </Group>
          </form>
        </Box>
      </div>
      {/*  */}
      <div className="bg-gradient-to-r from-[#00B4DB] to-[#0083B0]  flex flex-col items-center justify-center gap-5">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#E0EAFC] to-[#CFDEF3] ">
          Have An Account
        </h1>
        <p className="text-[#E0EAFC] text-sm md:text-medium max-w-[20rem] text-center font-semibold">
          Sign in and discover a greate amount of new opportunities!
        </p>
        <button
          onClick={() => {
            navigate("/login");
          }}
          className="sign_btn"
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default Register;
