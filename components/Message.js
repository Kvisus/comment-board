import Image from "next/image";
import React from "react";

const Message = ({ children, avatar, username, description }) => {
  return (
    <div className="bg-white p-8 border-b-2 rounded-lg">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 relative">
          <Image src={avatar} layout="fill" alt="avatar" className="rounded-full" />
        </div>
        <h2 className="">{username}</h2>
      </div>
      <div className="py-4">
        <p className="">{description}</p>
      </div>
      {children}
    </div>
  );
};

export default Message;
