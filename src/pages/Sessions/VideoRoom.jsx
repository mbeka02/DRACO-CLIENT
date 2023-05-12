import { useState, useEffect, useRef } from "react";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";

import { socket } from "../../utilities/socket";

import { getData } from "../../services/requests";

const VideoRoom = () => {
  const { sessionId } = useParams();
  const mediaStream = useRef();
  const myVideo = useRef();
  const peerRef = useRef();
  const otherVideo = useRef();
  const senders = useRef([]);
  const [videoImage, setVideoImage] = useState(true);
  const [micImage, setmicImage] = useState(true);
  const navigate = useNavigate();

  const toggleVideo = () => {
    const tracks = mediaStream.current
      .getTracks()
      .find((track) => track.kind === "video");
    tracks.enabled ? (tracks.enabled = false) : (tracks.enabled = true);
    //change svg
    setVideoImage((prev) => !prev);
  };

  const toggleMic = () => {
    const tracks = mediaStream.current
      .getTracks()
      .find((track) => track.kind === "audio");
    tracks.enabled ? (tracks.enabled = false) : (tracks.enabled = true);
    //change svg
    setmicImage((prev) => !prev);
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
          // url: 'stun:global.stun.twilio.com:3478',
          urls: "stun:global.stun.twilio.com:3478",
        },
        {
          // url: 'turn:global.turn.twilio.com:3478?transport=udp',
          username:
            "0c966af170eff3db5eea40d4caaf7006759a96edb6a7aafd7a8435b939bdfb9a",
          urls: "turn:global.turn.twilio.com:3478?transport=udp",
          credential: "ohrFzf7UJKxfmEpwo3Yu89ZMw4r0L1A7BrWg30EmfFc=",
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

  //hang up call
  const hangUp = () => {
    //close peer connection
    //bugged
    // peerRef.current.destroy();
    console.log(peerRef.current);
    //close media stream
    mediaStream.current.getTracks().forEach((track) => track.stop());
    //redirect to home page
    navigate("/main/sessions");
  };

  return (
    <div className="  mx-2 my-2 flex  h-screen w-full flex-col   md:mx-0 md:my-0 md:ml-14">
      <div className=" relative  flex h-full ">
        {mediaStream && (
          <div className="  fixed right-2 top-2 h-24 w-32 rounded  border-[1px] border-solid border-blue-custom ">
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
          className="w-full object-fill"
        />

        <div className="  absolute  inset-x-0  bottom-4   flex   justify-center  bg-transparent">
          <div className="flex items-center  gap-2  ">
            <button
              onClick={toggleVideo}
              className=" flex h-14  w-14   items-center justify-center  justify-self-center  rounded-full bg-blue-custom"
            >
              {
                //if video is on show video icon else show off icon
                videoImage ? (
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
                ) : (
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
                      d="M16.4415 18.5474C16.8693 18.0915 17.1432 17.5128 17.2245 16.8929L21.8895 18.9659C22.1178 19.0677 22.368 19.1107 22.6172 19.0912C22.8664 19.0717 23.1068 18.9902 23.3165 18.8541C23.5262 18.718 23.6986 18.5317 23.8179 18.3121C23.9373 18.0924 23.9999 17.8464 24 17.5964V6.40344C23.9998 6.15365 23.9372 5.90788 23.8179 5.68841C23.6986 5.46895 23.5264 5.28275 23.3169 5.14672C23.1074 5.01068 22.8673 4.92911 22.6183 4.90942C22.3693 4.88973 22.1193 4.93253 21.891 5.03394L17.2245 7.10694C17.1292 6.38557 16.7749 5.72344 16.2277 5.24383C15.6805 4.76423 14.9776 4.49986 14.25 4.49994H6.408L16.4415 18.5474ZM1.2705 5.04744C0.877833 5.32464 0.557479 5.69208 0.336387 6.11887C0.115295 6.54565 -6.90215e-05 7.01929 3.09809e-08 7.49994V16.4999C3.09809e-08 17.2956 0.316071 18.0587 0.87868 18.6213C1.44129 19.1839 2.20435 19.4999 3 19.4999H11.592L1.2705 5.04744ZM15.8895 22.9349L0.8895 1.93494L2.1105 1.06494L17.1105 22.0649L15.8895 22.9349Z"
                      fill="white"
                    />
                  </svg>
                )
              }
            </button>
            <button
              onClick={toggleMic}
              className=" flex h-14  w-14   items-center justify-center  justify-self-center  rounded-full bg-blue-custom"
            >
              {micImage ? (
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
              ) : (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 10.6V5C15 3.34 13.66 2 12 2C10.46 2 9.21 3.16 9.04 4.65L15 10.6ZM18.08 11C17.67 11 17.31 11.3 17.25 11.71C17.2 12.03 17.13 12.35 17.03 12.64L18.3 13.91C18.6 13.31 18.82 12.66 18.93 11.97C18.9461 11.8489 18.9361 11.7258 18.9008 11.6089C18.8654 11.492 18.8055 11.384 18.725 11.2922C18.6445 11.2003 18.5454 11.1268 18.4341 11.0764C18.3229 11.026 18.2021 10.9999 18.08 11ZM3.71 3.56C3.6173 3.65251 3.54375 3.7624 3.49357 3.88338C3.44339 4.00435 3.41756 4.13403 3.41756 4.265C3.41756 4.39597 3.44339 4.52565 3.49357 4.64662C3.54375 4.7676 3.6173 4.87749 3.71 4.97L9 10.27V10.7C9 11.89 9.6 13.02 10.63 13.61C11.38 14.04 12.04 14.05 12.65 13.92L14.31 15.58C13.6 15.91 12.81 16.1 12 16.1C9.46 16.1 7.12 14.33 6.75 11.71C6.7192 11.5121 6.61859 11.3317 6.46636 11.2014C6.31413 11.0712 6.12033 10.9998 5.92 11C5.4 11 5 11.46 5.07 11.97C5.53 14.93 8.03 17.27 11 17.72V20C11 20.55 11.45 21 12 21C12.55 21 13 20.55 13 20V17.72C13.8996 17.5854 14.7652 17.2799 15.55 16.82L19.04 20.31C19.227 20.497 19.4806 20.602 19.745 20.602C20.0094 20.602 20.263 20.497 20.45 20.31C20.637 20.123 20.742 19.8694 20.742 19.605C20.742 19.3406 20.637 19.087 20.45 18.9L5.12 3.56C5.02749 3.4673 4.9176 3.39375 4.79662 3.34357C4.67565 3.29339 4.54597 3.26756 4.415 3.26756C4.28403 3.26756 4.15435 3.29339 4.03338 3.34357C3.9124 3.39375 3.80251 3.4673 3.71 3.56Z"
                    fill="white"
                  />
                </svg>
              )}
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
            <button
              className=" flex h-14  w-14   items-center justify-center  justify-self-center  rounded-full bg-red-custom"
              onClick={hangUp}
            >
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
