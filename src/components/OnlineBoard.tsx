import useSocket from "@/hooks/socket";
import { useApp } from "@/provider/app";
import { Move } from "@/types";
import Box from "@mui/material/Box";
import { useEffect, useRef, useState } from "react";
import { OBoard } from "./Board";
import InviteModal, { IModalRef } from "./InviteModal";
import JoinModal, { IJoinModalRef } from "./JoinModal";

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
  const [guestID, setGuestID] = useState<string | undefined>();
  const [currentPlayer, setCurrentPlayer] = useState<string | undefined>();

  function handlePlay(nextSquares: any) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setCurrentPlayer(socket.id);

    const move: Move = {
      currentMove: nextHistory.length - 1,
      nextHistory,
      timeOfMove: Date.now(),
      socketID: socket.id,
      currentPlayerID: socket.id,
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
    // console.log("isConnected", isConnected);
    try {
      const socketID = socket.id;
      const payload = {
        id: "1234",
        socketID,
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

      const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/board/join`;
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          socketID: socket.id,
          room,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resource = await response.json();

      if (response.status !== 200 && response.status !== 201) {
        throw new Error(resource.message);
      }

      console.log(resource, "resource AM HERE ==>");
      socket.emit("joinRoom", payload);
    } catch (error) {
      console.log(error, "REQUEST ERROR");
    }
  };

  function onRoomieJoined(doc: any) {
    console.log("REACHED HERE  ===>");
    console.log("onRoomJoined", doc);
    const socketID = socket.id;
    inviteModalRef.current?.close();
    joinModalRef.current?.close();
    setStatus("joined");
    setRoom(doc.room);
    setGuestID(doc.guestSocketID);
  }

  function onRoomCreated(doc: any) {
    const socketID = socket.id;
    console.log("SOCKET ID ===>", socketID);
    console.log("CREATOR DOc ===>", doc);
    if (socketID === doc.socketID) {
      // Creator
      console.log("onRoomCreated  ===>");
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
    setCurrentPlayer(doc.currentPlayerID);
  }

  const getCanPlay = () => {
    if (currentMove === 0 && guestID === socket.id) {
      return false;
    }
    if (currentPlayer && currentPlayer === socket.id) {
      return false;
    }
    return true;
  };

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
      <OBoard
        xIsNext={xIsNext}
        canPlay={getCanPlay()}
        squares={currentSquares}
        onPlay={handlePlay}
        currentMove={currentMove}
      />
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
