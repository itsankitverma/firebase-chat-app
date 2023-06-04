import React from "react";
import MessagePanel from "../components/messagePanel";
import useFirebase from "@/lib/useFirebase";
import IndexPlaceholder from "@/components/indexPlaceholder";

const Index = () => {
  const { user } = useFirebase();
  return (
    <div className="flex ">
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
    </div>
  );
};

export default Index;
