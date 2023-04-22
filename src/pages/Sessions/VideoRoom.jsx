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
  const [mute, setMute] = useState(false);

  const myVideo = useRef();
  const callerVideo = useRef();
  const connectionRef = useRef();
  const { sessionId } = useParams();

  //const roomId = 1;

  const peerCall = () => {
    const peer = new Peer({
      //? not sure on this
      trickle: false,
      stream: mediaStream,
      //initiator of the call
      initiator: true,
      //fix turn servers config
      config: {
        iceServers: [
          {
            // url: "stun:global.stun.twilio.com:3478",
            urls: "stun:global.stun.twilio.com:3478",
          },
          {
            //url: "turn:global.turn.twilio.com:3478?transport=udp",
            username:
              "d311cbe1d1e082c7fc0df8c8be4f51520abb3dd66032b69a079ed58c70a241d5",
            urls: "turn:global.turn.twilio.com:3478?transport=udp",
            credential: "0t2kZmkrPpNef7a7PV8Qa/Y99neuxCPtEGdNGDHYVGE=",
          },
        ],
      },
    });
    //signal
    //need to establish a handshake between the peers (peer x has to know the capabilities of peer y)
    peer.on("signal", (data) => {
      socket.emit("incomingCall", {
        signalData: data,
        //need to pass the room that the event will be emitted in
        room: sessionId,
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
  // recipient peer of the call
  const acceptCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: mediaStream,
      config: {
        iceServers: [
          {
            urls: "stun:global.stun.twilio.com:3478",
          },
          {
            username:
              "733e52ddbbba9d49238f5a50eea39788a8dab940ffe0f0eb43ddfd710bd0aeb3",
            urls: "turn:global.turn.twilio.com:3478?transport=udp",
            credential: "IKOydg+bE83Zdt0QBR+RZSBExWLB/Q9mREiao3B0PE4=",
          },
        ],
      },
    });

    peer.on("signal", (data) => {
      socket.emit("acceptCall", { signal: data, room: sessionId });
    });

    peer.on("stream", (stream) => {
      callerVideo.current.srcObject = stream;
    });
    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  //testing all connnected devices in call
  const getConnectedDevices = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    console.log(devices);
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
    socket.emit("join", sessionId);
    socket.on("call", (data) => {
      setReceivingCall(true);
      setCallerSignal(data.signal);
    });
    getConnectedDevices();
  }, []);

  return (
    <div className="rb  grid h-screen w-screen">
      <button onClick={peerCall}>call</button>
      <div className="flex gap-2">
        {mediaStream && (
          <div className="grid">
            <video
              autoPlay
              playsInline
              ref={myVideo}
              className="myVideo"
              muted={false}
            />
            <button
              onClick={() => setMute((prev) => !prev)}
              className=" rb bg-blue-custom text-white"
            >
              Mute
            </button>
          </div>
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
