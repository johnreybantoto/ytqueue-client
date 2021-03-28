import React, { useState } from "react";
import { Accordion, Card, Icon } from "semantic-ui-react";
import VideoItem from "./VideoItem";

function SearchResult({ searchResults, addToQueue, searchQuery }) {
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
}

export default SearchResult;
