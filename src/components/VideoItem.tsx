import React, { FC } from "react";
import { Grid, Icon, Image, Reveal } from "semantic-ui-react";
import { IVideoItem } from "../core/interfaces";

interface Props {
  item: IVideoItem;
  onThumbnailClick: (item: IVideoItem) => IVideoItem;
  onRemoveClick?: (item: IVideoItem) => IVideoItem;
  thumbnailText: string;
  isInsideQueue?: boolean;
}

const VideoItem: FC<Props> = ({
  item,
  onThumbnailClick,
  onRemoveClick,
  thumbnailText,
  isInsideQueue,
}) => {
  const handleThumbnailClick = () => {
    onThumbnailClick(item);
    item.isPlayed = !!isInsideQueue;
  };

  const handleRemove = () => {
    if (onRemoveClick) {
      onRemoveClick(item);
    }
  };

  return (
    <Grid
      columns={2}
      style={item.isPlayed ? { backgroundColor: "#dbdce6" } : {}}
    >
      <Grid.Row style={{ margin: "1rem" }}>
        <Grid.Column
          width={6}
          style={{ cursor: "pointer" }}
          onClick={handleThumbnailClick}
        >
          <Reveal animated="small fade">
            <Reveal.Content visible>
              <Image src={item.snippet.thumbnails.default.url} />
            </Reveal.Content>
            <Reveal.Content hidden>
              <Icon disabled name="play circle" />
              {thumbnailText}
            </Reveal.Content>
          </Reveal>
        </Grid.Column>
        <Grid.Column>
          <div>{item.snippet.title}</div>
          <p>{item.humanizedTime}</p>
          {isInsideQueue && (
            <Icon
              color="red"
              style={{ cursor: "pointer" }}
              onClick={handleRemove}
              name="delete"
            />
          )}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default VideoItem;
