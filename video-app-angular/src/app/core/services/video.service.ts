import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';

import { HttpService } from '@app/core/services/http.service';
import { LocalStorageService } from './local-storage.service';
import { recognizeTheUrlProvider } from '@app/shared/utils/api-utils';
import { UrlProvider } from '@app/core/enums/url-provider.enum';
import { Video } from '@app/core/models/video.model';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  private videos: Video[] = this.localStorageService.getVideos();
  private _videos: BehaviorSubject<Video[]> = new BehaviorSubject<Video[]>(this.videos);
  public videos$: Observable<Video[]> = this._videos.asObservable();

  constructor(private httpService: HttpService, private localStorageService: LocalStorageService) {}

  public addVideo(url: string): void {
    const recognizedUrlProvider = recognizeTheUrlProvider(url);

    if (recognizedUrlProvider === UrlProvider.YouTube) {
      this.addYouTubeVideo(url);
      return;
    }

    if (recognizedUrlProvider === UrlProvider.Vimeo) {
      this.addVimeoVideo(url);
      return;
    }
    // // Ten alert zniknie w następnym PR jak będę dodawać obsługę błędów
    return alert(`Provided ulr is ${UrlProvider.Incorrect}`);
  }

  private addYouTubeVideo(url: string): void {
    this.httpService.getYoutubeVideo(url).subscribe((resp) => {
      const { id, video } = resp;
      const { player, snippet, statistics } = video.items[0];

      const newVideo: Video = {
        id,
        title: snippet.title,
        viewsCount: statistics.viewCount,
        likesCount: statistics.likeCount,
        thumbnail: snippet.thumbnails.medium.url,
        embedHtml: player.embedHtml,
        isFavorite: false,
        addedAt: new Date(),
      };

      this.videos.push(newVideo);
      this._videos.next([...this.videos]);
      this.localStorageService.addVideo(newVideo);
    });
  }

  private addVimeoVideo(url: string): void {
    this.httpService.getVimeoVideo(url).subscribe((resp) => {
      const { id = '', video } = resp;
      const { name, player_embed_url, metadata, pictures, stats } = video;

      const newVideo: Video = {
        id,
        title: name,
        viewsCount: stats.plays.toString(),
        likesCount: metadata.connections.likes.total.toString(),
        thumbnail: pictures.base_link,
        embedHtml: player_embed_url,
        isFavorite: false,
        addedAt: new Date(),
      };

      this.videos.push(newVideo);
      this._videos.next([...this.videos]);
      this.localStorageService.addVideo(newVideo);
    });
  }
}
