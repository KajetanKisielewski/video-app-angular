import { Component } from '@angular/core';
import { VideoService } from '@app/core/services/video.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  constructor(private videoService: VideoService) {}

  public displayAllVideos(): void {
    this.videoService.setAllVideos();
  }

  public displayFavoriteVideos(): void {
    this.videoService.setFavoriteVideos();
  }
}
