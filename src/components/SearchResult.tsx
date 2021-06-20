import React, { FC, useState } from "react";
import { Accordion, Card, Icon } from "semantic-ui-react";
import { IVideoItem } from "../core/interfaces";
import VideoItem from "./VideoItem";

interface Props {
  searchResults: any[];
  addToQueue: (item: IVideoItem) => any;
  searchQuery: string;
}

const SearchResult: FC<Props> = ({
  searchResults,
  addToQueue,
  searchQuery,
}) => {
  const [accordionOpen, setAccordionOpen] = useState(true);

  return (
    <Accordion>
      <Accordion.Title
        active={accordionOpen}
        onClick={() => setAccordionOpen(!accordionOpen)}
      >
        <Icon name="dropdown" />
        Search Result for "{searchQuery}"
      </Accordion.Title>
      <Accordion.Content active={accordionOpen}>
        <Card fluid>
          <Card.Content>
            {searchResults?.length &&
              searchResults.map((x) => (
                <VideoItem
                  key={x.id.videoId}
                  item={x}
                  thumbnailText="Add to queue"
                  onThumbnailClick={addToQueue}
                />
              ))}
          </Card.Content>
        </Card>
      </Accordion.Content>
    </Accordion>
  );
};

export default SearchResult;
