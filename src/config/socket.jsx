import { useEffect } from "react";
import { io } from "socket.io-client";

export const useSocket = (userId, reciverId) => {
  const socket = io("http://localhost:3000", {
    query: { userId, reciverId },
  });
  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    });
  }, []);

  return { socket };
};
