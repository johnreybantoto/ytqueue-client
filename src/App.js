import Search from "./components/Search";
import SearchResult from "./components/SearchResult";
import VideoPlayer from "./components/VideoPlayer";
import VideoQueue from "./components/VideoQueue";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Container, Grid } from "semantic-ui-react";
import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [videoToPlay, setVideoToPlay] = useState({});
  const [queue, setQueue] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasStoredQueue, setHasStoredQueue] = useState(false);
  const [loading, setLoading] = useState(false);
  const ytqueueServer = process.env.REACT_APP_YTQUEUE_SERVER || "";

  useEffect(() => {
    if (queue.length) {
      localStorage.setItem("storedQueue", JSON.stringify(queue));
    }
  }, [queue]);

  useEffect(() => {
    const storedQueue = JSON.parse(localStorage.getItem("storedQueue"));
    if (storedQueue?.length) {
      setHasStoredQueue(true);
    }
  }, []);

  const loadStoredQueue = () => {
    setIsLoaded(true);
    const storedQueue = JSON.parse(localStorage.getItem("storedQueue"));
    setQueue(storedQueue);
  };

  const searchVideo = async (searchQuery) => {
    setLoading(true);
    let { data } = await axios.get(`${ytqueueServer}api/search/${searchQuery}`);
    data = data?.map((x) => {
      const publishedAt = dayjs(x.snippet.publishedAt).fromNow();
      return { ...x, publishedAt };
    });

    setSearchQuery(searchQuery);
    setSearchResults(data);
    setLoading(false);
  };

  const addToQueue = (item) => {
    if (queue.length < 1) {
      setVideoToPlay(item);
      item.played = true;
    }
    item.key = Math.random().toString(36).substr(2, 5);
    setQueue([...queue, item]);
  };

  const playNextInQueue = (key) => {
    const playedItemIndex = queue.findIndex((x) => x.key === key);

    if (playedItemIndex >= 0 && playedItemIndex !== queue.length) {
      const nextItemIndex = playedItemIndex + 1;
      const nextItemToPlay = queue[nextItemIndex];
      if (nextItemToPlay) {
        nextItemToPlay.played = true;
        setQueue([...queue]);
        setVideoToPlay(nextItemToPlay);
      }
    }
  };

  const removeItem = (item) => {
    const itemToRemove = queue.findIndex((x) => x.key === item.key);
    queue.splice(itemToRemove, 1);

    setQueue([...queue]);
  };

  const playItem = (item) => {
    const itemToPlay = queue.find((x) => x.key === item.key);
    itemToPlay.isPlayed = true;
    setQueue([...queue]);
    setVideoToPlay(itemToPlay);
  };

  return (
    <Container>
      <Search loading={loading} searchVideo={searchVideo} />

      <Grid columns="equal">
        <Grid.Column>
          {searchResults?.length > 0 && (
            <SearchResult
              searchQuery={searchQuery}
              searchResults={searchResults}
              addToQueue={addToQueue}
            />
          )}
          <VideoPlayer videoToPlay={videoToPlay} onEnded={playNextInQueue} />
        </Grid.Column>
        <Grid.Column>
          {/* maintain state of queue */}
          <VideoQueue
            playItem={playItem}
            removeItem={removeItem}
            queue={queue}
            setQueue={setQueue}
          />
          {hasStoredQueue && !isLoaded && (
            <Button secondary size="small" onClick={loadStoredQueue}>
              Load queue from local storage
            </Button>
          )}
        </Grid.Column>
      </Grid>
    </Container>
  );
}

export default App;
