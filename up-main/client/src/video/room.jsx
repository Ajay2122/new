import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import "./room.scss";

const Room = () => {
  const { videoId } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  console.log(currentUser.user.username);
  const meetingRef = useRef(null);

  useEffect(() => {
    const myMeeting = async () => {
      const appId = 1038036099;
      const serverSecret = "360ded5c1858d48a33382e4a77b22917";
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appId,
        serverSecret,
        videoId,
        Date.now().toString() /* Enter your ID ha userId and given accesses of id*/,
        currentUser.user.username
      );

      const zc = ZegoUIKitPrebuilt.create(kitToken);
      zc.joinRoom({
        container: meetingRef.current,
        sharedLinks: [
          {
            name: "Copy Link",
            url: `http://localhost:5173:/video/${videoId}`,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
        showScreenSharingButton: true,
      });
    };

    myMeeting();
  }, [videoId]);

  return (
    <div>
      <div ref={meetingRef} className="meeting-container"></div>
    </div>
  );
};

export default Room;

