import { ReactNode } from "react";

export type childrenProps = {
  children: ReactNode;
  color: string;
};

export type textProps = {
  text: string;
};

export type pathProps = {
  path: string;
};

export type callbackProps = {
  callback: () => void;
};

export type Authorize = {
  email: string;
  password: string;
} | null;

export type Prompt = {
  author: string;
  message: string;
};
