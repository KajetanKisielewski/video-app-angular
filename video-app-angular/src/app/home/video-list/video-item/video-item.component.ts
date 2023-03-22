import { Component, Input } from '@angular/core';

import { Video } from '@app/core/models/video.model';

@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.scss'],
})
export class VideoItemComponent {
  @Input() public video!: Video;
}
