import { ClassName, OnChangeTextarea, SetState } from "@/types/types";
import React, { ReactNode } from "react";

type InputProps = {
  placeholder: string;
  state: string;
  setState: SetState<string>;
  className?: ClassName;
};

export const Input: React.FC<InputProps> = ({
  placeholder,
  state,
  setState,
  className = "",
}) => {
  return (
    <input
      className={`${className} press-shadow-sm p-2 bg-primary-white`}
      type="text"
      placeholder={placeholder}
      value={state}
      onChange={(event) => setState(event.target.value)}
    />
  );
};

type DropdownProps = {
  children: ReactNode;
  state: string;
  setState: SetState<string>;
  className?: ClassName;
};

export const Dropdown: React.FC<DropdownProps> = ({
  children,
  state,
  setState,
  className = "",
}) => {
  return (
    <select
      className="press-shadow-sm p-2 bg-primary-white"
      value={state}
      onChange={(event) => setState(event.target.value)}
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
};

export const Textarea: React.FC<TextareaProps> = ({
  placeholder,
  state,
  setState,
  className = "",
}) => {
  return (
    <textarea
      className={`${className} press-shadow-sm p-2 bg-primary-white`}
      placeholder={placeholder}
      value={state}
      onChange={(event) => setState(event.target.value)}
    />
  );
};
