import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment.development';
import { getYoutubeVideoID, getVimeoVideoID } from '@shared/utils/api-utils';
import { YoutubeVideo, VimeoVideo } from '@core/models/video.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public getYoutubeVideo(url: string): Observable<YoutubeVideo> {
    const id = getYoutubeVideoID(url)
    const path = `${environment.youtubeUrl}?id=${id}&key=${environment.youtubeToken}&part=snippet,statistics,player&fields=items(snippet(title,thumbnails),statistics(viewCount,likeCount),player(embedHtml))`;

    return this.http.get<YoutubeVideo>( path );
  }

  public getVimeoVideo(url: string): Observable<VimeoVideo> {
    const id = getVimeoVideoID(url)
    const path = `${environment.vimeoUrl}${id}?fields=name,pictures.base_link,metadata.connections.likes.total,stats.plays,player_embed_url`;
    const headers = new HttpHeaders ({
      Authorization: `Bearer ${environment.vimeoToken}`,
    })
    
    return this.http.get<VimeoVideo>( path, { headers } );
  }
}
