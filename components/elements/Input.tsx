import { ClassName, OnChangeTextarea, SetState } from "@/types/types";
import { prismaUpdateProject } from "@/utils/prisma";
import React, { ReactNode, useEffect } from "react";

type InputProps = {
  placeholder: string;
  state: string;
  setState: SetState<string>;
  className?: ClassName;
  callback: (event: string) => void;
};

export const Input: React.FC<InputProps> = ({
  placeholder,
  state,
  setState,
  className = "",
  callback,
}) => {
  useEffect(() => {
    if (state === " ") return;
    callback(state);
  }, [state]);

  return (
    <input
      className={`${className} press-shadow-sm p-2 bg-primary-white`}
      type="text"
      placeholder={placeholder}
      value={state}
      onChange={async (event) => {
        setState(event.target.value);
      }}
    />
  );
};

type DropdownProps = {
  children: ReactNode;
  state: string;
  setState: SetState<string>;
  className?: ClassName;
  callback: (event: string) => void;
};

export const Dropdown: React.FC<DropdownProps> = ({
  children,
  state,
  setState,
  className = "",
  callback,
}) => {
  useEffect(() => {
    if (state === " ") return;
    callback(state);
  }, [state]);

  return (
    <select
      className={`${className} press-shadow-sm p-2 bg-primary-white`}
      value={state}
      onChange={(event) => {
        setState(event.target.value);
        callback(event.target.value);
      }}
    >
      {children}
    </select>
  );
};

type TextareaProps = {
  placeholder: string;
  state: string;
  setState: SetState<string>;
  className?: ClassName;
  callback: (event: string) => void;
};

export const Textarea: React.FC<TextareaProps> = ({
  placeholder,
  state,
  setState,
  className = "",
  callback,
}) => {
  useEffect(() => {
    if (state === " ") return;
    callback(state);
  }, [state]);

  return (
    <textarea
      className={`${className} press-shadow-sm p-2 bg-primary-white`}
      placeholder={placeholder}
      value={state}
      onChange={(event) => {
        setState(event.target.value);
        callback(event.target.value);
      }}
    />
  );
};
