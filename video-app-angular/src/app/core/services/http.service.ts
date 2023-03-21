import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { environment } from '@environments/environment.development';
import { getYoutubeVideoID, getVimeoVideoID } from '@shared/utils/api-utils';
import { YouTubeVideo, VimeoVideo, VimeoVideoData, YouTubeVideoData } from '@core/models/video.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) {}

  public getYoutubeVideo(url: string): Observable<YouTubeVideoData> {
    const id = getYoutubeVideoID(url);
    const path = `${environment.youtubeUrl}?id=${id}&key=${environment.youtubeToken}&part=snippet,statistics,player&fields=items(snippet(title,thumbnails),statistics(viewCount,likeCount),player(embedHtml))`;

    return this.http.get<YouTubeVideo>( path ).pipe(
      map(video => ({id, video}) )
    );
  }

  public getVimeoVideo(url: string): Observable<VimeoVideoData> {
    const id = getVimeoVideoID(url);
    const path = `${environment.vimeoUrl}${id}?fields=name,pictures.base_link,metadata.connections.likes.total,stats.plays,player_embed_url`;
    const headers = new HttpHeaders ({
      Authorization: `Bearer ${environment.vimeoToken}`,
    });
    
    return this.http.get<VimeoVideo>( path, { headers } ).pipe(
      map(video => ({id, video}) )
    );
  }
}
