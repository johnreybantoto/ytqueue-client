import React, { FC, useState } from "react";
import { Button, Input, Icon, Grid } from "semantic-ui-react";
import "../App.css";
import AboutModal from "./AboutModal";

interface Props {
  searchVideo: any;
  loading: boolean;
}

const Search: FC<Props> = ({ searchVideo, loading }) => {
  const [searchInput, setSearchInput] = useState("");
  const [isKaraoke, setIsKaraoke] = useState(true);

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      submit();
    }
  };

  const submit = () => {
    if (!loading && searchInput.trim()) {
      searchVideo(`${searchInput} ${isKaraoke ? "karaoke" : ""}`);
    }
  };

  return (
    <Grid columns="equal">
      <Grid.Column width={8}>
        <Input
          fluid
          placeholder="Search..."
          value={searchInput}
          onKeyDown={handleKeyDown}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </Grid.Column>
      <Grid.Column>
        <Button loading={loading} icon labelPosition="left" onClick={submit}>
          <Icon name="search" />
          Search
        </Button>
      </Grid.Column>
      <Grid.Column>
        <div>
          <input
            type="checkbox"
            id="is-karaoke"
            checked={isKaraoke}
            onChange={(e) => setIsKaraoke(e.currentTarget.checked)}
          />
          <label htmlFor="is-karaoke">Add "karaoke" to search</label>
        </div>
      </Grid.Column>
      <Grid.Column>
        <AboutModal></AboutModal>
      </Grid.Column>
    </Grid>
  );
};

export default Search;
