import { HttpHeaders } from "@angular/common/http";

import { environment } from "src/environments/environment.development";
import { FetchParametersForVideo } from "src/app/core/models/api.model";

const getYoutubeVideoID = (url: string): string => {
  const regex = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/gi;
  return url?.replace(regex, `$1`);
};
  
const getVimeoVideoID = (url: string): string | undefined => {
  const regex = /(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_-]+)?/i;
  return url?.match(regex)?.[1];
};

const generateFetchParametersForYoutube = (url: string): FetchParametersForVideo => {
  const youtubeVideoID = getYoutubeVideoID(url);
  const path = `${environment.youtubeUrl}?id=${youtubeVideoID}&key=${environment.youtubeToken}&part=snippet,statistics&fields=items(id,snippet(title,thumbnails),statistics(viewCount,likeCount))`;
  
  return { path }
};
  
const generateFetchParametersForVimeo = (url: string): FetchParametersForVideo => {
  const vimeoVideoID = getVimeoVideoID(url);
  const path = `${environment.vimeoUrl}${vimeoVideoID}?fields=name,pictures.base_link,metadata.connections.likes.total,stats.plays,player_embed_url`;
  
  const headers = new HttpHeaders ({
    Authorization: `Bearer ${environment.vimeoToken}`,
  })

  return { path, headers };
};

export const generateFetchParameters = (url: string): FetchParametersForVideo  => {
  const youtubeIDLength = 11;
  const includedWord = "you";

  return url?.length === youtubeIDLength || url?.includes(includedWord)
    ? generateFetchParametersForYoutube(url)
    : generateFetchParametersForVimeo(url);
};
