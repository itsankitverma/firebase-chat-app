import MessagePanel from "@/components/messagePanel";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import useFirebase from "@/lib/useFirebase";
import { MessageList, User, userState } from "@/state/state";
import { useRecoilState } from "recoil";
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

const Handle = () => {
  const router = useRouter();
  const { user } = useFirebase();
  const [users] = useRecoilState(userState);
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState<MessageList[]>([]);
  const [selectedUser, setSelectedUser] = useState<User>();
  const { handle } = router.query;

  const foundUser = users.find((currUser) => currUser.handle === handle);

  useEffect(() => {
    if (foundUser) {
      return setSelectedUser(foundUser);
    }
  }, [users, foundUser]);

  useEffect(() => {
    onSnapshot(
      collection(db, `users/${user?.uid}/${selectedUser?.id}`),
      (querySnapshot) => {
        const usersList: MessageList[] = [];
        querySnapshot.forEach((doc: any) => {
          usersList.push(doc.data());
        });
        setMessageList(usersList);
      }
    );
  }, [user, selectedUser]);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex flex-col">
        <MessagePanel />
      </div>
      <div className="w-full relative mt-2 md:mt-0">
        <div>
          <div className="flex gap-3 bg-gray-200 md:p-3 p-2.5 cursor-pointer w-full">
            <img
              src={selectedUser?.image as string}
              alt={selectedUser?.name as string}
              className="w-14 h-14 rounded-full"
            />
            <div className="flex flex-col w-full items-start flex-1 ">
              <h2 className=" font-normal text-lg w-56 truncate">
                {selectedUser?.name}
              </h2>
              <div className=" w-56 truncate">{selectedUser?.email}</div>
            </div>
          </div>
        </div>
        <div>
          <div className="md:h-[30rem] overflow-auto">
            {messageList &&
              messageList.map((messageInfo, id) => {
                return (
                  <div key={id}>
                    <div className="flex items-start justify-between gap-3 p-5">
                      <div className="flex gap-3">
                        <img
                          src={messageInfo?.image as string}
                          alt=""
                          className="h-12 w-12 rounded-full"
                        />
                        <div className="flex flex-col items-start">
                          <p className="text-lg font-medium">
                            {messageInfo?.name}
                          </p>
                          <p className="">{messageInfo.message}</p>
                        </div>
                      </div>
                      <div>
                        <p>2:30PM</p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="flex items-start w-full">
          <textarea
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            className="w-full flex-1 flex rounded-md p-2"
            placeholder="Type a message"
          />
          <div
            className="w-8 h-8 bg-[#4656A1] text-white rounded-lg cursor-pointer"
            onClick={async () => {
              if (!message) {
                return alert("Please enter your message");
              }

              await addDoc(
                collection(db, `users/${user?.uid}/${selectedUser?.id}`),
                {
                  name: user?.displayName,
                  id: user?.uid,
                  receiverId: user?.uid,
                  image: user?.photoURL,
                  sentAt: serverTimestamp(),
                  message,
                }
              );
              await addDoc(
                collection(db, `users/${selectedUser?.id}/${user?.uid}`),
                {
                  name: user?.displayName,
                  senderId: selectedUser?.id,
                  id: user?.uid,
                  image: user?.photoURL,
                  sentAt: serverTimestamp(),
                  message,
                }
              );
              setMessage("");
            }}
          >
            <PaperAirplaneIcon className="w-full p-1 " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Handle;
