import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Video } from '@app/core/models/video.model';
import { VideoService } from '@app/core/services/video.service';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss'],
})
export class VideoListComponent {
  public videos$: Observable<Video[]> = this.videoService.videos$;

  constructor(private videoService: VideoService) {}
}
