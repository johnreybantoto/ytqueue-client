import React, { FC } from "react";
import { Card } from "semantic-ui-react";
import VideoItem from "./VideoItem";
import { ReactSortable } from "react-sortablejs";
import "../App.css";
import { IVideoItem } from "../core/interfaces";

interface Props {
  queue: any[];
  setQueue: any;
  removeItem: (item: IVideoItem) => any;
  playItem: (item: IVideoItem) => any;
}

const VideoQueue: FC<Props> = ({ queue, setQueue, removeItem, playItem }) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>Queue</Card.Header>
      </Card.Content>
      <Card.Content className="video-queue">
        <ReactSortable list={queue} setList={setQueue}>
          {queue?.length &&
            queue?.map((x) => (
              <VideoItem
                key={x.key}
                thumbnailText="Play"
                onRemoveClick={removeItem}
                onThumbnailClick={playItem}
                showDelete
                item={x}
              />
            ))}
        </ReactSortable>
        {!queue?.length && <h4>No item in queue</h4>}
      </Card.Content>
    </Card>
  );
};

export default VideoQueue;
