export interface YouTubeVideo {
  snippet: {
    title: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
  };
  statistics: {
    viewCount: string;
    likeCount: string;
  };
  player: {
    embedHtml: string;
  }
}

export interface VimeoVideo {
  name: string;
  player_embed_url: string;
  metadata: {
    connections: {
      likes: {
        total: number;
      };
    };
  };
  pictures: {
    base_link: string;
  };
  stats: {
    plays: number;
  };
}
