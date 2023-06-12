import { Loader } from "@mantine/core";
import React from "react";

const BtnLoading = ({ text }) => {
  return (
    <button className="btn border-sky-900  relative ">
      <h1 className="text-transparent">{text}</h1>
      <Loader
        className="absolute top-0 left-0 w-full h-full p-2 "
        size="sm"
        variant="bars" 
        color="blue"
      />
    </button>
  );
};

export default BtnLoading;
