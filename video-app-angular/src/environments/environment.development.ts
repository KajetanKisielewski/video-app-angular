import { YOUTUBE_API_TOKEN, VIMEO_API_TOKEN } from 'access-tokens';

export const environment = {
    production: false,
    youtubeUrl: `https://www.googleapis.com/youtube/v3/videos`,
    youtubeToken: YOUTUBE_API_TOKEN,
    vimeoUrl: 'https://api.vimeo.com/videos/',
    vimeoToken: VIMEO_API_TOKEN,
};
