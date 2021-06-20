import Search from "./components/Search";
import SearchResult from "./components/SearchResult";
import VideoPlayer from "./components/VideoPlayer";
import VideoQueue from "./components/VideoQueue";
import { FC, useEffect, useState } from "react";
import axios from "axios";
import { Button, Container, Grid } from "semantic-ui-react";
import ReactGa from "react-ga";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { IVideoItem } from "./core/interfaces";
dayjs.extend(relativeTime);

const App: FC = () => {
  const [searchResults, setSearchResults] = useState<IVideoItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [videoToPlay, setVideoToPlay] = useState<IVideoItem | null>(null);
  const [queue, setQueue] = useState<IVideoItem[]>([]);
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
    const localQueue = localStorage.getItem("storedQueue");
    if (localQueue) {
      const storedQueue = JSON.parse(localQueue);
      if (storedQueue?.length) {
        setHasStoredQueue(true);
      }
    }

    ReactGa.initialize("UA-193720727-1");
    ReactGa.pageview("/");
  }, []);

  const loadStoredQueue = () => {
    setIsLoaded(true);
    const localQueue = localStorage.getItem("storedQueue");
    if (localQueue) {
      const storedQueue = JSON.parse(localQueue);
      setQueue(storedQueue);
    }
  };

  const searchVideo = async (searchQuery: string) => {
    setLoading(true);
    let { data } = await axios.get<IVideoItem[]>(
      `${ytqueueServer}api/search/${searchQuery}`
    );
    data = data?.map((x) => {
      const publishedAt = dayjs(x.snippet.publishedAt).fromNow();
      return { ...x, publishedAt };
    });

    setSearchQuery(searchQuery);
    setSearchResults(data);
    setLoading(false);
  };

  const addToQueue = (item: IVideoItem) => {
    if (queue.length < 1) {
      setVideoToPlay(item);
      item.played = true;
    }
    item.key = Math.random().toString(36).substr(2, 5);
    setQueue([...queue, item]);
  };

  const playNextInQueue = (key: string) => {
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

  const removeItem = (item: IVideoItem) => {
    const itemToRemove = queue.findIndex((x) => x.key === item.key);
    queue.splice(itemToRemove, 1);

    setQueue([...queue]);
  };

  const playItem = (item: IVideoItem) => {
    const itemToPlay = queue.find((x) => x.key === item.key);
    setQueue([...queue]);
    if (itemToPlay) {
      setVideoToPlay(itemToPlay);
    }
  };

  return (
    <Container>
      <Search loading={loading} searchVideo={searchVideo} />

      <Grid columns="equal">
        <Grid.Column>
          {searchResults?.length > 0 && (
            <SearchResult
              searchResults={searchResults}
              addToQueue={addToQueue}
              searchQuery={searchQuery}
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
};

export default App;
