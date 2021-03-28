import React from "react";
import { Grid, Icon, Image, Reveal } from "semantic-ui-react";

function VideoItem({
  item,
  onThumbnailClick,
  onRemoveClick,
  thumbnailText,
  showDelete,
}) {
  const handleThumbnailClick = () => {
    onThumbnailClick(item);
  };

  const handleRemove = () => {
    onRemoveClick(item);
  };

  return (
    <Grid columns={2}>
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
          <div>{item.publishedAt}</div>
          {showDelete && (
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
}

export default VideoItem;
