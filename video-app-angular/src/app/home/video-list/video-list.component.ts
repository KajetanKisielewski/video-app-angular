import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Video } from '@app/core/models/video.model';
import { VideoService } from '@app/core/services/video.service';
import { DisplayService } from '@app/core/services/display.service';
import { DisplayType } from '@app/core/enums/display-type.enum';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent implements OnInit, OnDestroy {
  public videos$!: Observable<Video[]>;
  public displayType!: DisplayType;
  private subscription!: Subscription;

  constructor(
    private videoService: VideoService,
    private displayService: DisplayService
  ) {}

  public ngOnInit(): void {
    this.videos$ = this.videoService.videos$;
    this.subscription = this.displayService.displayType$.subscribe((displayType) => this.displayType = displayType);
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  };

  public removeVideo(id: string): void {
    this.videoService.removeVideo(id);
  };

  public toggleFavoriteVideo(id: string): void {
    this.videoService.toggleFavoriteVideo(id);
  };
}
