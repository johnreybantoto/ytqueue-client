import React from "react";
import ReactPlayer from "react-player/youtube";
import { Container } from "semantic-ui-react";
import "../App.css";

function VideoPlayer({ videoToPlay, onEnded }) {
  const youtubeUrl = "https://www.youtube.com/watch?v=";
  let isPip = false;

  // TODO: button to toggle picture in picture
  // const togglePictureInPicture = async () => {
  //   const videos = document.getElementsByTagName("video");

  //   if (videos.length) {
  //     const video = videos[0];
  //     console.log(
  //       "🚀 ~ file: VideoPlayer.js ~ line 19 ~ togglePictureInPicture ~ video",
  //       video
  //     );
  //     if (!isPip) {
  //       await video[0].requestPictureInPicture();
  //       isPip = true;
  //       video.setAttribute("isPip", true);
  //       video.addEventListener(
  //         "leavepictureinpicture",
  //         (event) => {
  //           isPip = false;

  //           video.removeAttribute("isPip");
  //         },
  //         {
  //           once: true,
  //         }
  //       );
  //     }
  //   }
  // };

  return (
    <Container>
      <h4>Currently playing</h4>
      <div className="video-responsive">
        <ReactPlayer
          playing
          controls
          onEnded={() => onEnded(videoToPlay?.key)}
          url={`${youtubeUrl}${videoToPlay?.id?.videoId}`}
        />
      </div>
      {/* <Button onClick={togglePictureInPicture}>
        Toggle picture-in-picture
      </Button> */}
    </Container>
  );
}

export default VideoPlayer;
