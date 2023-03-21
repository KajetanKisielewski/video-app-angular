export interface YouTubeVideo {
  items: {
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
    };
  }[];
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

export interface Video {
  id: string;
  title: string;
  viewsCount: string;
  likesCount: string;
  thumbnail: string;
  embedHtml: string;
  isFavorite: boolean;
  addedAt: Date,
}

export interface VimeoVideoData {
  id: string | undefined;
  video: VimeoVideo;
}

export interface YouTubeVideoData {
  id: string;
  video: YouTubeVideo;
}
