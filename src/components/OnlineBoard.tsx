import useSocket from "@/hooks/socket";
import { useApp } from "@/provider/app";
import { useEffect, useRef, useState } from "react";
import Board from "./Board";
import Box from "@mui/material/Box";
import InviteModal, { IModalRef } from "./InviteModal";
import JoinModal, { IJoinModalRef } from "./JoinModal";
import { Move } from "@/types";

const OnlineBoard: React.FC = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const { isConnected, socket, connect, disconnect } = useSocket();
  const { gameOption } = useApp();
  const [room, setRoom] = useState();

  const [status, setStatus] = useState<string | undefined>();

  const inviteModalRef = useRef<IModalRef>(null);
  const joinModalRef = useRef<IJoinModalRef>(null);

  function handlePlay(nextSquares: any) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);

    const move: Move = {
      currentMove: nextHistory.length - 1,
      nextHistory,
      timeOfMove: Date.now(),
      socketID: socket.id,
    };
    socket.emit("playRoom", move);
  }

  function init() {
    switch (gameOption) {
      case "invite":
        if (!status) {
          inviteModalRef.current?.open();
        }

        break;
      case "join":
        console.log("status");
        joinModalRef.current?.open();
        break;
      default:
        break;
    }
  }

  async function onInvite() {
    console.log("isConnected", isConnected);
    try {
      const payload = {
        id: "1234",
      };
      socket.emit("createRoom", payload);
      // Create room
    } catch (error) {}
  }

  const onJoin = async (room: string) => {
    try {
      const payload = {
        room,
      };
      socket.emit("joinRoom", payload);
    } catch (error) {}
  };

  function onRoomieJoined(doc: any) {
    console.log("REACHED HERE  ===>");
    console.log("onRoomJoined", doc);
    const socketID = socket.id;
    inviteModalRef.current?.close();
    joinModalRef.current?.close();
    setStatus("joined");
    setRoom(doc.room);
  }

  function onRoomCreated(doc: any) {
    const socketID = socket.id;
    if (socketID === doc.socketID) {
      setStatus("waiting");
      setRoom(doc.room);
    }
  }

  function onRoomiePlayed(doc: Move) {
    console.log("DOCUMENT", doc.currentMove);
    const nextHistory = doc.nextHistory;
    const currentMove = doc.currentMove;
    setHistory(nextHistory);
    setCurrentMove(currentMove);
  }

  useEffect(() => {
    connect();
    init();
    return () => {
      disconnect();
    };
  }, []);

  useEffect(() => {
    socket.on("roomCreated", onRoomCreated);
    socket.on("roomateJoined", onRoomieJoined);
    socket.on("roomatePlayed", onRoomiePlayed);

    // Clean up connections
    return () => {
      socket.off("roomCreated", onRoomCreated);
      socket.off("roomateJoined", onRoomieJoined);
      socket.off("roomatePlayed", onRoomiePlayed);
    };
  }, []);

  return (
    <Box>
      <Box display={"flex"} justifyContent={"center"} onClick={() => {}}>
        {isConnected ? "Connected" : "Disconnected"}
      </Box>
      <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      <InviteModal
        joinStatus={status}
        onInvite={onInvite}
        ref={inviteModalRef}
        room={room}
      />
      <JoinModal ref={joinModalRef} status={status} onJoin={onJoin} />
    </Box>
  );
};

export default OnlineBoard;
