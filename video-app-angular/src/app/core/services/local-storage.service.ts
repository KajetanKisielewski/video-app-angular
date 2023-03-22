import { Injectable } from '@angular/core';

import { Video } from '@app/core/models/video.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private storageKey = 'videos';

  public addVideo(video: Video): void {
    const videosFromStorage = this.getVideos();
    videosFromStorage.push(video);
    localStorage.setItem(this.storageKey, JSON.stringify(videosFromStorage));
  }

  public getVideos(): Video[] {
    const storedVideos = localStorage.getItem(this.storageKey);
    return storedVideos ? JSON.parse(storedVideos) : [];
  }
}
