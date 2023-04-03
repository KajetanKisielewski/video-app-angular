import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, last, take } from 'rxjs';

import { HttpService } from '@app/core/services/http.service';
import { LocalStorageService } from './local-storage.service';
import { recognizeTheUrlProvider } from '@app/shared/utils/api-utils';
import { UrlProvider } from '@app/core/enums/url-provider.enum';
import { Video } from '@app/core/models/video.model';
import { demoList } from '@app/core/providers/demo-list';

@Injectable({
  providedIn: 'root',
})
export class VideoService implements OnInit {
  private videos!: Video[];
  private _videos!: BehaviorSubject<Video[]>;
  public videos$!: Observable<Video[]>;

  constructor(private httpService: HttpService, private localStorageService: LocalStorageService) {
    this.ngOnInit();
  }

  public ngOnInit(): void {
    this.videos = this.localStorageService.getVideos();
    this._videos = new BehaviorSubject<Video[]>(this.videos);
    this.videos$ = this._videos.asObservable();
  }

  public setAllVideos(): void {
    this.videos = this.localStorageService.getVideos();
    this._videos.next([...this.videos]);
  }

  public setFavoriteVideos(): void {
    this.videos = this.videos.filter((video) => video.isFavorite);
    this._videos.next([...this.videos]);
  }

  public uploadDemoList(): void {
    demoList.forEach((url) => this.addVideo(url));
  }

  public clearVideos(): void {
    this.videos = [];
    this._videos.next([...this.videos]);
    this.localStorageService.clearVideos();
  }

  public sortVideos(isDescending: boolean): void {
    this.videos.sort((a, b) => {
      if (isDescending) return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
      return new Date(a.addedAt).getTime() - new Date(b.addedAt).getTime();
    });
    this._videos.next([...this.videos]);
    this.localStorageService.sortVideos(isDescending);
  }

  public toggleFavoriteVideo(id: string): void {
    const index = this.videos.findIndex((v) => v.id === id);
    if (index === -1) return;

    this.videos[index].isFavorite = !this.videos[index].isFavorite;
    this._videos.next([...this.videos]);
    this.localStorageService.updateVideo(this.videos[index]);
  }

  public removeVideo(id: string) {
    this.videos = this.videos.filter((v) => v.id !== id);
    this._videos.next([...this.videos]);
    this.localStorageService.removeVideo(id);
  }

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
