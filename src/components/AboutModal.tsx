import React from "react";
import { Button, Container, Modal } from "semantic-ui-react";

function AboutModal() {
  const [open, setOpen] = React.useState(false);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button circular>?</Button>}
    >
      <Modal.Header>About YTQueue</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <h4>
            This YouTube Queue Web App is created primarily for Karaoke use
          </h4>
          <h5>Recommended setup:</h5>
          <Container>
            <ol>
              <li>
                Use Firefox browser to allow picture in picture to be scaled to
                full screen
              </li>
              <li>Connect PC to secondary screen (TV,Monitor,Projector)</li>
              <li>Connect PC to speaker </li>
              <li>Search for a song</li>
              <li>Add song to queue by clicking the thumbnail</li>
              <li>
                Reorder, remove, skip song as they appear in the "Queue" column
              </li>
              <li>
                When a video is playing, hold Shift then right click the video
              </li>
              <li>Select "Picture-in-Picture"</li>
              <li>Drag the window to the secondary screen and resize</li>
            </ol>
            <br />
            <h5>
              This site uses YouTube API for searches, by using this you agree
              to{" "}
            </h5>
            <ul>
              <li>
                <a href="https://www.youtube.com/t/terms">
                  YouTube Terms of Service
                </a>
              </li>
              <li>
                <a href="http://www.google.com/policies/privacy">
                  Google Privacy Policy
                </a>
              </li>
            </ul>
          </Container>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setOpen(false)}>
          Ok
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default AboutModal;
