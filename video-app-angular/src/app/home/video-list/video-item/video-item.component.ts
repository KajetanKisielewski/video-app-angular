import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Video } from '@app/core/models/video.model'
import { DisplayType } from '@app/core/enums/display-type.enum';

@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.scss']
})
export class VideoItemComponent {
  @Input() public video!: Video;
  @Input() public displayType!: DisplayType;

  @Output() public removeVideo = new EventEmitter<string>();
  @Output() public toggleFavoriteVideo = new EventEmitter<string>();

  constructor() {}

  public emitRemoveVideo() {
    this.removeVideo.emit(this.video.id);
  };

  public emitToggleFavoriteVideo() {
    this.toggleFavoriteVideo.emit(this.video.id);
  };
}
