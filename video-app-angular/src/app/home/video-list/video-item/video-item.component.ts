import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Video } from '@app/core/models/video.model'

@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.scss']
})
export class VideoItemComponent {
  @Input() public video!: Video;

  @Output() public removeVideo = new EventEmitter<string>();
  @Output() public toggleFavoriteVideo = new EventEmitter<string>();

  constructor() {}

  public emitRemoveVideo() {
    this.removeVideo.emit(this.video.id);
  }

  public emitToggleFavoriteVideo() {
    this.toggleFavoriteVideo.emit(this.video.id);
  }
}
