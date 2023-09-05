"use client";
import React from "react";
import { NextAuthProvider } from "@/app/providers";
import Box from "./Box";

const page = () => {
  return (
    <NextAuthProvider>
      <Box />
    </NextAuthProvider>
  );
};

export default page;
