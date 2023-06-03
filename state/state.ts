import { atom } from "recoil";

export interface MessageList {
  message: string;
  receiverId: string;
  receiverImage: string;
  receiverName: string;
  senderId: string;
  senderImage: string;
  senderName: string;
  sentAt: any;
  image: string;
  name: string;
}

export interface User {
  email: string;
  image: string;
  name: string;
  handle: string;
  id: string;
  updatedAt: any;
}

export const DEFAUL_USER_STATE: User = {
  email: "email@gmail.com",
  image: "",
  name: "",
  updatedAt: "",
  handle: "",
  id: "",
};

const userState = atom<User[]>({
  key: "userState",
  default: [],
});
const selectedUserState = atom<User>({
  key: "selectedUserState",
  default: DEFAUL_USER_STATE,
});
const currentUserState = atom<User>({
  key: "currentUserState",
  default: DEFAUL_USER_STATE,
});

export { userState, selectedUserState, currentUserState };
