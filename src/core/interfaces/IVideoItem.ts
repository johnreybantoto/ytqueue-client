export interface IVideoItem {
  id: {
    videoId: string;
  };
  snippet: {
    thumbnails: {
      default: {
        url: string;
      };
    };
    title: string;
    publishedAt: string;
  };
  publishedAt: string;
  played: boolean;
  key: string;
}
