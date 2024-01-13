import { useEffect, useState } from "react";
import { socket } from "../socket";

const useSocket = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState<any>([]);
  const [roomEvents, setRoomEvents] = useState<any>([]);

  useEffect(() => {
    function onConnect() {
      console.log("CONNNECTED ==>");
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  function connect() {
    socket.connect();
  }

  function disconnect() {
    socket.disconnect();
  }

  console.log("ROOM EVENT", roomEvents);

  return {
    isConnected: isConnected,
    setIsConnected: setIsConnected,
    connect: connect,
    disconnect: disconnect,
    socket: socket,
  };
};

export default useSocket;
