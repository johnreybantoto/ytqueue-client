# This YouTube Queue Web App is created primarily for Karaoke use

## Live demo [here](https://ytqueue.herokuapp.com/)

## To run locally:

- Requires internet connection, [node.js](https://nodejs.org/en/download/), [yarn](https://classic.yarnpkg.com/en/docs/install/#windows-stable)

1. Clone [ytqueue-server](https://github.com/johnreybantoto/ytqueue-server) then navigate to project directory
2. Uncomment cors comments
3. Add `.env` file to the project root directory. Add the following key
   - YOUTUBE_API_KEY=<your_key>
   - MAX_RESULTS=5
   - PORT=4000
4. Get your YouTube Api key [here](https://developers.google.com/youtube/v3/getting-started) and add to the `.env` file
5. Run `npm install` then `npm start`
6. Clone [ytqueue-client](https://github.com/johnreybantoto/ytqueue-client) then navigate to project directory
7. Add `.env` file to the project root directory. Add the following key
   - REACT_APP_YTQUEUE_SERVER=http://localhost:4000/
8. Run `yarn install` then `yarn start`

## Recommended setup:

1.  Use Firefox browser to allow picture in picture to be scaled to
    full screen
2.  Connect PC to secondary screen (TV,Monitor,Projector)
3.  Connect PC and mic to speaker
4.  Search for a song
5.  Add song to queue by clicking the thumbnail
6.  Reorder, remove, skip song as they appear in the "Queue" column
7.  When a video is playing, hold Shift then right click the video
8.  Select "Picture-in-Picture"
9.  Drag the window to the secondary screen and resize

## This site uses YouTube API for searches, by using this you agree to:

- [YouTube Terms of Service](https://www.youtube.com/t/terms)

- [Google Privacy Policy](http://www.google.com/policies/privacy)
