import { Component } from '@angular/core';

import { VideoService } from '@app/core/services/video.service';
import { DisplayService } from '@app/core/services/display.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  constructor(private videoService: VideoService, private displayService: DisplayService) {}

  public uploadDemoList(): void {
    this.videoService.uploadDemoList();
  }

  public clearVideoList(): void {
    this.videoService.clearVideos();
  }

  public sortVideos(isDescending: boolean): void {
    this.videoService.sortVideos(isDescending);
  }

  public displayAsTiles(): void {
    this.displayService.displayAsTiles();
  }

  public displayAsList(): void {
    this.displayService.displayAsList();
  }
}
