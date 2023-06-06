import React from "react";
import MessagePanel from "../components/messagePanel";
import useFirebase from "@/lib/useFirebase";
import IndexPlaceholder from "@/components/indexPlaceholder";

const Index = () => {
  const { user, handleSignInWithGoogle } = useFirebase();
  return (
    <div
      className={`flex ${
        !user &&
        "bg-gradient-to-r from-indigo-100 from-10% via-sky-100 via-30% to-emerald-100 to-90% h-screen"
      }`}
    >
      {user && (
        <div className="flex w-full">
          <div>
            <MessagePanel />
          </div>
          <div className="w-full pt-10 hidden md:flex">
            <div className="flex flex-col items-center justify-center w-full">
              <h2 className="text-3xl font-bold text-transparent text-center bg-clip-text bg-gradient-to-r from-[#4656A1] to-blue-600">
                Choose a profile to start chatting
              </h2>
              <IndexPlaceholder />
            </div>
          </div>
        </div>
      )}
      {!user && (
        <div className="flex flex-col justify-center gap-10 items-center w-full py-28 md:py-40">
          <div className="flex flex-col justify-center items-center gap-4 w-full px-2 text-center">
            <h1 className="text-2xl md:text-5xl font-bold">
              ConnectMe: Engage, Chat, and Discover.
            </h1>
            <p className="md:w-[40rem] text-center">
              Seamless connections. Engaging conversations. Endless
              possibilities. ConnectMe brings people together
            </p>
          </div>
          <button
            onClick={() => handleSignInWithGoogle()}
            className="p-3 bg-[#4656A1] text-white rounded-lg"
          >
            Get Started
          </button>
        </div>
      )}
    </div>
  );
};

export default Index;
