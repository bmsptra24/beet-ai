import {
  ChangeEventHandler,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
} from "react";

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

export type ClassName = HTMLAttributes<HTMLInputElement> | string;

export type OnChangeInput = ChangeEventHandler<HTMLInputElement>;

export type OnChangeTextarea =
  | React.ChangeEventHandler<HTMLTextAreaElement>
  | undefined;

export type Placeholder =
  | InputHTMLAttributes<HTMLInputElement>
  | string
  | undefined;

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
