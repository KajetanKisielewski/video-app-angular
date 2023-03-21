import { Injectable } from '@angular/core';

import { Video } from '../models/video.model';

@Injectable({
  providedIn: 'root'
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

  public removeVideo(id: string): void {
    const videosFromStorage = this.getVideos();
    const updatedVideos = videosFromStorage.filter((v) => v.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(updatedVideos));
  }

  public updateVideo(video: Video): void {
    const videosFromStorage = this.getVideos();
    const index = videosFromStorage.findIndex((v) => v.id === video.id);
    if (index === -1) return
    
    videosFromStorage[index] = video;
    localStorage.setItem(this.storageKey, JSON.stringify(videosFromStorage));
  }

  public clearVideos(): void {
    localStorage.removeItem(this.storageKey);
  }
}
