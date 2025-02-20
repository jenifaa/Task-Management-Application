// src/hooks/useWebSocket.js
import { useEffect } from "react";
import { io } from "socket.io-client";

const useWebSocket = () => {
  useEffect(() => {
    const socket = io("http://localhost:5000"); 

    // Listen for events from the server
    socket.on("taskUpdated", (task) => {
      console.log("Task updated:", task);
      // Here you can handle the task updates (e.g., re-fetch tasks or update state)
    });

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return;
};

export default useWebSocket;
