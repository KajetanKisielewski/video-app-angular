import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription, take } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

import { Video } from '@app/core/models/video.model';
import { VideoService } from '@app/core/services/video.service';
import { DisplayService } from '@app/core/services/display.service';
import { DisplayType } from '@app/core/enums/display-type.enum';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss'],
})
export class VideoListComponent implements OnInit, OnDestroy {
  public videos!: Video[];
  public displayType!: DisplayType;
  private displaySubscription!: Subscription;
  private videoSubscription!: Subscription;

  public requestedVideos!: Video[];
  public length!: number;
  public pageSize = 3;
  public pageSizeOptions = [3, 6, 9];
  public pageIndex = 0;

  constructor(
    private videoService: VideoService,
    private displayService: DisplayService
  ) {}

  public ngOnInit(): void {
    this.displaySubscription = this.displayService.displayType$.subscribe(
      (displayType) => (this.displayType = displayType)
    );

    this.videoSubscription = this.videoService.videos$.subscribe((videos) => {
      this.videos = videos;
      this.length = this.videos.length;

      this.setVideos();
    });
  }

  public ngOnDestroy(): void {
    this.displaySubscription.unsubscribe();
    this.videoSubscription.unsubscribe();
  }

  public removeVideo(id: string): void {
    this.videoService.removeVideo(id);
  }

  public toggleFavoriteVideo(id: string): void {
    this.videoService.toggleFavoriteVideo(id);
  }

  public setPaginator(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;

    this.setVideos();
  }

  private setVideos() {
    this.requestedVideos = [...this.videos];

    const firstIndex = Number(this.pageIndex * this.pageSize);
    const lastIndex = (this.pageIndex + Number(1)) * this.pageSize;

    this.requestedVideos = this.requestedVideos.slice(firstIndex, lastIndex);
  }
}
