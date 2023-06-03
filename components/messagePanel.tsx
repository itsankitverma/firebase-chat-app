import { db } from "@/lib/firebase";
import { onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { collection, query } from "firebase/firestore";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  User,
  currentUserState,
  selectedUserState,
  userState,
} from "@/state/state";
import { useRouter } from "next/router";
import useFirebase from "@/lib/useFirebase";

export default function MessagePanel() {
  const [users, setUsers] = useRecoilState(userState);
  const setSelectedUser = useSetRecoilState(selectedUserState);
  const setCurrentUser = useSetRecoilState(currentUserState);
  const router = useRouter();
  const { user } = useFirebase();
  const [filteredList, setFilteredList] = useState<User[]>();

  const currentUser = users.find((currUser) => currUser.email === user?.email);

  useEffect(() => {
    if (currentUser) {
      return setCurrentUser(currentUser);
    }
  }, [currentUser]);

  useEffect(() => {
    const q = query(collection(db, "users"));
    onSnapshot(collection(db, "users"), (querySnapshot) => {
      const usersList: User[] = [];
      querySnapshot.forEach((doc: any) => {
        usersList.push(doc.data());
      });
      setUsers(usersList);
    });
  }, []);

  useEffect(() => {
    const filteredUsers = users.filter((user) => user.id !== currentUser?.id);
    setFilteredList(filteredUsers);
  }, [users]);

  return (
    <div className="">
      {/* <div className="w-full md:w-[29.2rem] bg-gray-100 text-gray-900 md:h-screen md:flex flex-col ">
        {users &&
          filteredList?.map((user) => {
            return (
              <div
                key={user.email}
                className="flex gap-3 hover:bg-gray-200 md:p-3 p-2.5 cursor-pointer"
                onClick={() => {
                  setSelectedUser(user);
                  router.push(`/p/${user?.email?.split("@")[0].toLowerCase()}`);
                }}
              >
                <img
                  src={user.image as string}
                  alt={user.name}
                  className="w-14 h-14 rounded-full"
                />
                <div className="flex flex-col w-full items-start flex-1 ">
                  <h2 className=" font-normal text-lg w-56 truncate">
                    {user.name}
                  </h2>
                  <div className=" w-56 truncate">{user.email}</div>
                </div>
              </div>
            );
          })}
      </div> */}
      <div className="w-full md:w-[29.2rem] bg-gray-100 text-gray-900 md:h-screen flex flex-row md:flex-col ">
        {users &&
          filteredList?.map((user) => {
            return (
              <div
                key={user.email}
                className="flex gap-3 hover:bg-gray-200 md:p-3 p-2.5 cursor-pointer"
                onClick={() => {
                  setSelectedUser(user);
                  router.push(`/p/${user?.email?.split("@")[0].toLowerCase()}`);
                }}
              >
                <img
                  src={user.image as string}
                  alt={user.name}
                  className="w-14 h-14 rounded-full"
                />
                <div className="hidden md:flex md:flex-col w-full items-start flex-1 ">
                  <h2 className=" font-normal text-lg w-56 truncate">
                    {user.name}
                  </h2>
                  <div className=" w-56 truncate">{user.email}</div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
