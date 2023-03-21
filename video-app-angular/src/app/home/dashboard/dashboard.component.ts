import { Component } from '@angular/core';

import { VideoService } from '@app/core/services/video.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(private videoService: VideoService) {}

  public uploadDemoList(): void {
    this.videoService.uploadDemoList();
  };

  public clearVideoList(): void {
    this.videoService.clearVideos();
  }

  public sortVideos(isDescending: boolean): void {
    this.videoService.sortVideos(isDescending)
  }
}
