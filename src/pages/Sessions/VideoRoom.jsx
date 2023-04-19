import global from "global";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import * as process from "process";
global.process = process;

import { socket } from "../../utilities/socket";
import Peer from "simple-peer";
const VideoRoom = () => {
  const [mediaStream, setMediaStream] = useState("");
  const [callAccepted, setCallAccepted] = useState(false);
  const [receivingCall, setReceivingCall] = useState(false);
  const [callerSignal, setCallerSignal] = useState("");

  const myVideo = useRef();
  const callerVideo = useRef();
  const connectionRef = useRef();
  const { sessionId } = useParams();
  const roomId = 1;

  const peerCall = () => {
    const peer = new Peer({
      //? not sure on this
      trickle: false,
      stream: mediaStream,
      //initiator of the call
      initiator: true,
    });
    //signal
    //need to establish a handshake between the peers (peer x has to know the capabilities of peer y)
    peer.on("signal", (data) => {
      socket.emit("incomingCall", {
        signalData: data,
        room: roomId,
      });
    });
    //incoming data of other person
    peer.on("stream", (stream) => {
      if (callerVideo.current);

      callerVideo.current.srcObject = stream;
    });
    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const acceptCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: mediaStream,
    });

    peer.on("signal", (data) => {
      socket.emit("acceptCall", { signal: data, room: roomId });
    });

    peer.on("stream", (stream) => {
      callerVideo.current.srcObject = stream;
    });
    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  useEffect(() => {
    //ask for access to users webcam and audio on page render
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setMediaStream(stream);
        if (myVideo.current) {
          //object needs to be passed to the video element
          myVideo.current.srcObject = stream;
        }
      });
    socket.on("call", (data) => {
      console.log("stuff");
      setReceivingCall(true);
      setCallerSignal(data.signal);
    });
  }, []);

  return (
    <div className="rb  grid h-screen w-screen">
      <button onClick={peerCall}>call</button>
      <div className="flex gap-2">
        {mediaStream && (
          <video autoPlay playsInline ref={myVideo} className="myVideo" />
        )}
        {callAccepted && (
          <video
            autoPlay
            playsInline
            ref={callerVideo}
            className="callerVideo"
          />
        )}
      </div>
      {receivingCall && (
        <div onClick={acceptCall} className="bg-blue-custom">
          Accept call
        </div>
      )}
    </div>
  );
};

export default VideoRoom;
