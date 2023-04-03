import { UrlProvider, youtubeIDLength, includedVimeoWord, includedYoutubeWord } from "@app/core/enums/url-provider.enum";

export const getYoutubeVideoID = (url: string): string => {
  const regex = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/gi;
  return url?.replace(regex, `$1`);
};
  
export const getVimeoVideoID = (url: string): string | undefined => {
  const regex = /(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_-]+)?/i;
  return url?.match(regex)?.[1];
};

export const recognizeTheUrlProvider = (url: string): UrlProvider => {
  if(url?.length === youtubeIDLength || url?.includes(includedYoutubeWord)) return UrlProvider.YouTube
  if (url?.includes(includedVimeoWord)) return UrlProvider.Vimeo
  return UrlProvider.Incorrect
}
