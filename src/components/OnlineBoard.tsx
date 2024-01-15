import useSocket from "@/hooks/socket";
import { useApp } from "@/provider/app";
import { BoardCallbackParams, Move } from "@/types";
import Box from "@mui/material/Box";
import { memo, useEffect, useRef, useState } from "react";
import { OBoard } from "./Board";
import InviteModal, { IModalRef } from "./InviteModal";
import JoinModal, { IJoinModalRef } from "./JoinModal";
import BoardFooterControls from "./BoardFooterControls";
import Counter from "./Counter";
import dayjs from "dayjs";

const maxPlayTime = 59; // 60 seconds

const getTimeTaken = (counter: number, elaspedTime?: string) => {
  const timeTaken = maxPlayTime - counter;

  if (timeTaken < maxPlayTime) {
    return timeTaken;
  }

  //Time has elapsed
  console.log("REACHED HERE ===>");
  console.log("elaspedTime  ===>", elaspedTime);
  const then = dayjs(elaspedTime);
  const diff = dayjs().diff(then, "second");

  return diff + maxPlayTime;
};

const OnlineBoard: React.FC = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const { isConnected, socket, connect, disconnect } = useSocket();
  const { gameOption, onSetGameMode, onSetOption, openToast } = useApp();
  const [room, setRoom] = useState();
  const [status, setStatus] = useState<string | undefined>();
  const inviteModalRef = useRef<IModalRef>(null);
  const joinModalRef = useRef<IJoinModalRef>(null);
  const [guestID, setGuestID] = useState<string | undefined>();
  const [currentPlayer, setCurrentPlayer] = useState<string | undefined>();
  const [count, setCounter] = useState(maxPlayTime);
  const [joining, setJoining] = useState(false);
  const [elaspedTime, setElaspedTime] = useState<string | undefined>();
  const [sessionID, setSessionID] = useState<string | undefined>();

  function handlePlay(nextSquares: any) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setCurrentPlayer(socket.id);

    // Timeer oo
    setCounter(maxPlayTime);
    setElaspedTime(undefined);

    const move: Move = {
      currentMove: nextHistory.length - 1,
      nextHistory,
      timeOfMove: Date.now(),
      socketID: socket.id,
      currentPlayerID: socket.id,
      timeTaken: getTimeTaken(count, elaspedTime), // in seconds
    };

    socket.emit("playRoom", move);
  }

  function init() {
    switch (gameOption) {
      case "invite":
        if (!status) {
          inviteModalRef.current?.open();
          onInvite();
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
    try {
      const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/board`;
      setJoining(true);

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          type: "normal",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const resource = await response.json();
      if (response.status !== 200 && response.status !== 201) {
        throw new Error(resource.message);
      }

      const payload = {
        sessionID: resource.sessionID,
        room: resource.room,
      };

      // Create room
      socket.emit("createRoom", payload);

      setSessionID(resource.sessionID);
    } catch (error: any) {
      openToast(
        error?.message || "Unable to create invite. Try again",
        "error"
      );
    } finally {
      setJoining(false);
    }
  }

  const onJoin = async (room: string) => {
    try {
      setJoining(true);
      const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/board/join`;
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
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

      const payload = {
        room,
        sessionID: resource.sessionID,
      };
      socket.emit("joinRoom", payload);
      setSessionID(resource.sessionID);
    } catch (error: any) {
      openToast(error?.message || "Unable to join. Try again", "error");
      console.log(error, "REQUEST ERROR");
    } finally {
      setJoining(false);
    }
  };

  function onRoomieJoined(doc: any) {
    console.log("Roomie Joined  ===>");
    const socketID = socket.id;
    inviteModalRef.current?.close();
    joinModalRef.current?.close();
    setStatus("joined");
    setRoom(doc.room);
    setGuestID(doc.guestSocketID);
  }

  function onRoomCreated(doc: any) {
    console.log("ROOM CREATED ==>");
    const socketID = socket.id;

    if (socketID === doc.socketID) {
      // Creator

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
    setCounter(maxPlayTime);
    setElaspedTime(undefined);
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

  const onReset = () => {
    // Disabled by default
    // setHistory([Array(9).fill(null)]);
    // setCurrentMove(0);
    // Timer
    // setCounter(maxPlayTime);
    // setElaspedTime(undefined);
  };

  const goBackHome = () => {
    onSetGameMode(undefined);
    onSetOption(undefined);
  };

  const onCancel = () => {
    onSetGameMode(undefined);
    onSetOption(undefined);
  };

  const onUpdateBoard = async (params?: BoardCallbackParams) => {
    try {
      console.log("onUpdateBoard", params);

      if (!params) return;

      if (guestID === socket.id) {
        // Only an admin is allowed to update the board
        return;
      }

      setJoining(true);
      const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/board/${room}`;

      const data = {
        room,
        sessionID,
        winner_symbol: params.winner_symbol || undefined,
        status: params.status,
      };

      const response = await fetch(url, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const resource = await response.json();

      if (response.status !== 200 && response.status !== 201) {
        throw new Error(resource.message);
      }
    } catch (error: any) {
      openToast(error?.message || "Unable to join. Try again", "error");
      console.log(error, "REQUEST ERROR");
    } finally {
      setJoining(false);
    }
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

  useEffect(() => {
    if (status !== "joined") {
      return;
    }

    let timer: NodeJS.Timer | number = 0;

    if (count === 0) {
      clearInterval(timer as any);
      return;
    }

    timer = setInterval(() => {
      setCounter((prevCount) => {
        if (prevCount === 0) {
          clearInterval(timer as any);
          return prevCount;
        }

        return prevCount - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer as any);
    };
  }, [count, status]);

  return (
    <Box
      position={"relative"}
      display={"flex"}
      flexDirection={"row"}
      alignItems={"center"}
    >
      <Box>
        <OBoard
          xIsNext={xIsNext}
          canPlay={getCanPlay()}
          squares={currentSquares}
          onPlay={handlePlay}
          currentMove={currentMove}
          onCallBack={(params) => {
            setCounter(0);
            onUpdateBoard(params);
          }}
        />

        <BoardFooterControls
          hideReset
          onBackHome={goBackHome}
          onReset={onReset}
        />
      </Box>

      <Counter xIsNext={xIsNext} counter={count} onElapsed={setElaspedTime} />

      <InviteModal
        joinStatus={status}
        onInvite={onInvite}
        ref={inviteModalRef}
        room={room}
        onCancel={onCancel}
      />
      <JoinModal
        ref={joinModalRef}
        status={status}
        onJoin={onJoin}
        onCancel={onCancel}
        loading={joining}
      />
    </Box>
  );
};

export default memo(OnlineBoard);
