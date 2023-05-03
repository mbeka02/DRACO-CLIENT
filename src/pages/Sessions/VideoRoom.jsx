import { useState, useEffect, useRef } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import { socket } from "../../utilities/socket";

import { getData } from "../../services/requests";

const VideoRoom = () => {
  const { sessionId } = useParams();
  const mediaStream = useRef();
  const myVideo = useRef();
  const peerRef = useRef();
  const otherVideo = useRef();
  const senders = useRef([]);
  const origin = "http://localhost:3000";

  const { isLoading, data, error } = useQuery(["session", sessionId], () =>
    getData(`/api/v1/sessions/${sessionId}`)
  );
  //bugged
  // if (isLoading) return "...Loading";
  //if (error) return "error";

  const toggleVideo = () => {
    const tracks = mediaStream.current
      .getTracks()
      .find((track) => track.kind === "video");
    tracks.enabled ? (tracks.enabled = false) : (tracks.enabled = true);
  };

  const toggleMic = () => {
    const tracks = mediaStream.current
      .getTracks()
      .find((track) => track.kind === "audio");
    tracks.enabled ? (tracks.enabled = false) : (tracks.enabled = true);
  };

  useEffect(() => {
    //ask for access to users webcam and audio on page render
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        mediaStream.current = stream;
        if (myVideo.current) {
          //object needs to be passed to the video element
          myVideo.current.srcObject = stream;
        }
      });
    //emit join event
    socket.emit("join", sessionId);
    //only call peer when 2nd user has joined the session
    //replace roomId args not needed any more
    socket.on("otherUserJoined", (roomId) => {
      callPeer(roomId);
    });
    socket.on("offer", receivingCall);
    socket.on("answer", handleAnswer);
    socket.on("ice-candidate", handleIceCandidates);
  }, []);

  const createPeer = () => {
    //calling peer constructor
    const peer = new RTCPeerConnection({
      //STUN and TURN server config- using twilio for now
      //https://developer.mozilla.org/en-US/docs/Glossary/STUN
      // https://developer.mozilla.org/en-US/docs/Glossary/TURN
      iceServers: [
        {
          urls: "stun:global.stun.twilio.com:3478",
        },
        {
          username:
            "a89b0b9a23d78a7bff3b5dde58d7f2699ed9b6843133f9b2713e7c5141c27273",
          urls: "turn:global.turn.twilio.com:3478?transport=udp",
          credential: "VS5oGwRehz5k3/6ee+A4amA6CGq96MRoeEh/FkapHZ4=",
        },
      ],
    });
    //handle ice candidate events
    peer.onicecandidate = (e) => {
      if (e.candidate) {
        const payload = {
          candidate: e.candidate,
          roomId: sessionId,
        };
        socket.emit("ice-candidate", payload);
      }
    };
    //when we receive a remote peer stream
    peer.ontrack = (e) => {
      if (otherVideo.current) {
        otherVideo.current.srcObject = e.streams[0];
      }
    };
    //handles peer negotiation offer=>answer
    peer.onnegotiationneeded = () => handleOffer(sessionId);

    return peer;
  };

  const callPeer = (roomId) => {
    // console.log(roomId);
    peerRef.current = createPeer();
    //attaching stream to peer
    mediaStream.current
      .getTracks()
      .forEach((track) =>
        senders.current.push(
          peerRef.current.addTrack(track, mediaStream.current)
        )
      );
  };

  const receivingCall = (payload) => {
    peerRef.current = createPeer();
    //creates remote description being received from the remote peer
    const description = new RTCSessionDescription(payload.sdp);
    peerRef.current
      .setRemoteDescription(description)
      .then(() => {
        //added if statement while testing locally the webcam can't be used by two different browsers so the mediaStream for the receiver will be undefined
        if (mediaStream.current) {
          mediaStream.current
            .getTracks()
            .forEach((track) =>
              peerRef.current.addTrack(track, mediaStream.current)
            );
        }
      })
      .then(() => {
        return peerRef.current.createAnswer();
      })
      .then((answer) => {
        return peerRef.current.setLocalDescription(answer);
      })
      .then(() => {
        const payload = {
          roomId: sessionId,
          sdp: peerRef.current.localDescription,
        };
        socket.emit("answer", payload);
      });
  };

  const handleOffer = () => {
    peerRef.current
      .createOffer()
      .then((offer) => {
        return peerRef.current.setLocalDescription(offer);
      })
      .then(() => {
        const payload = {
          roomId: sessionId,
          //the actual offer data
          sdp: peerRef.current.localDescription,
        };
        socket.emit("offer", payload);
      })
      .catch((error) => console.log(error));
  };

  const handleAnswer = (args) => {
    const description = new RTCSessionDescription(args);
    peerRef.current
      .setRemoteDescription(description)
      .catch((error) => console.log(error));
  };

  const handleIceCandidates = (incoming) => {
    const ICEcandidate = new RTCIceCandidate(incoming);
    peerRef.current
      .addIceCandidate(ICEcandidate)
      .catch((error) => console.log(error));
  };

  //testing all connnected devices in call
  const getConnectedDevices = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    console.log(devices);
  };

  const screenShare = () => {
    navigator.mediaDevices.getDisplayMedia({ cursor: true }).then((stream) => {
      const displayScreen = stream.getTracks()[0];
      //replace current video track with screen capture
      senders.current
        .find((sender) => sender.track.kind === "video")
        .replaceTrack(displayScreen);
      //stop screen sharing
      displayScreen.onended = () => {
        senders.current
          .find((sender) => sender.track.kind === "video")
          .replaceTrack(mediaStream.current.getTracks()[1]);
      };
    });
  };

  return (
    <div className="  mx-2 my-2 flex  h-screen w-full flex-col   md:mx-0 md:my-0 md:ml-14">
      <div className="  grid  bg-white p-2 shadow ">
        {data?.session?.userIds?.map((user, index) => {
          return (
            <div key={index} className="flex items-center  justify-between ">
              <div className="flex items-center gap-2 ">
                <img
                  src={origin + user.avatarUrl}
                  alt="avatar"
                  className="h-16 w-16 rounded-full"
                />
                <div className="grid font-medium">{user.name}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="rb relative  flex h-5/6 flex-1">
        {mediaStream && (
          <div className="  absolute left-0 h-24 w-32 rounded  border-[1px] border-solid border-blue-custom ">
            <video
              autoPlay
              playsInline
              ref={myVideo}
              className=" object-fill "
            />
          </div>
        )}

        <video
          autoPlay
          playsInline
          ref={otherVideo}
          className="otherVideo rb   w-full object-fill"
        />

        <div className="  absolute  inset-x-0  bottom-4   flex   justify-center  bg-transparent">
          <div className="flex items-center  gap-2  ">
            <button
              onClick={toggleVideo}
              className=" flex h-14  w-14   items-center justify-center  justify-self-center  rounded-full bg-blue-custom"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.84615 5.53845C2.30769 5.53845 0 6.28891 0 6.89445V17.0769C0 17.6686 2.30769 18.4615 7.84615 18.4615C13.3846 18.4615 15.6923 17.7111 15.6923 17.1055V6.92307C15.6923 6.33138 13.3846 5.53845 7.84615 5.53845ZM23.4231 5.56707C23.2679 5.57325 23.1178 5.62352 22.9902 5.71199L16.9902 9.57691C16.7594 9.75045 16.6154 10.0366 16.6154 10.3274V13.6726C16.6154 13.9634 16.7594 14.2486 16.9902 14.4231L22.9902 18.2889C23.1526 18.4117 23.9428 18.7966 23.9428 17.5385V6.46153C23.9428 5.73507 23.6926 5.55599 23.4231 5.56707Z"
                  fill="white"
                />
              </svg>
            </button>
            <button
              onClick={toggleMic}
              className=" flex h-14  w-14   items-center justify-center  justify-self-center  rounded-full bg-blue-custom"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 14C11.1667 14 10.4583 13.7083 9.875 13.125C9.29167 12.5417 9 11.8333 9 11V5C9 4.16667 9.29167 3.45833 9.875 2.875C10.4583 2.29167 11.1667 2 12 2C12.8333 2 13.5417 2.29167 14.125 2.875C14.7083 3.45833 15 4.16667 15 5V11C15 11.8333 14.7083 12.5417 14.125 13.125C13.5417 13.7083 12.8333 14 12 14ZM11 21V17.925C9.26667 17.6917 7.83333 16.9167 6.7 15.6C5.56667 14.2833 5 12.75 5 11H7C7 12.3833 7.48767 13.5627 8.463 14.538C9.43833 15.5133 10.6173 16.0007 12 16C13.3833 16 14.5627 15.5123 15.538 14.537C16.5133 13.5617 17.0007 12.3827 17 11H19C19 12.75 18.4333 14.2833 17.3 15.6C16.1667 16.9167 14.7333 17.6917 13 17.925V21H11Z"
                  fill="white"
                />
              </svg>
            </button>
            <button
              className=" flex h-14  w-14   items-center justify-center  justify-self-center  rounded-full bg-blue-custom"
              onClick={screenShare}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 20V4H22V12.025H20V6H4V18H14.025V20H2ZM19.5 21L18.4 18.6L16 17.5L18.4 16.4L19.5 14L20.6 16.4L23 17.5L20.6 18.6L19.5 21ZM12 16L13.25 13.25L16 12L13.25 10.75L12 8L10.75 10.75L8 12L10.75 13.25L12 16Z"
                  fill="white"
                />
              </svg>
            </button>
            <button className=" flex h-14  w-14   items-center justify-center  justify-self-center  rounded-full bg-red-custom">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.8275 0.766476C3.08996 0.504409 3.40512 0.301114 3.75209 0.170061C4.09907 0.0390087 4.46993 -0.0168078 4.84011 0.00631052C5.21028 0.0294288 5.57132 0.130954 5.89929 0.304158C6.22726 0.477362 6.51468 0.71829 6.7425 1.01098L9.435 4.46998C9.9285 5.10448 10.1025 5.93098 9.9075 6.71098L9.087 9.99598C9.04458 10.1661 9.04687 10.3443 9.09365 10.5133C9.14043 10.6823 9.23012 10.8364 9.354 10.9605L13.0395 14.646C13.1638 14.7701 13.318 14.8599 13.4873 14.9067C13.6566 14.9535 13.8351 14.9557 14.0055 14.913L17.289 14.0925C17.6739 13.9962 18.0757 13.9888 18.4639 14.0706C18.8522 14.1525 19.2167 14.3215 19.53 14.565L22.989 17.256C24.2325 18.2235 24.3465 20.061 23.2335 21.1725L21.6825 22.7235C20.5725 23.8335 18.9135 24.321 17.367 23.7765C13.4088 22.3838 9.81491 20.1177 6.852 17.1465C3.88093 14.184 1.61491 10.5907 0.221997 6.63298C-0.321003 5.08798 0.166497 3.42748 1.2765 2.31748L2.8275 0.766476Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoRoom;
