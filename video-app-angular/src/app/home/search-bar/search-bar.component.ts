import { Component } from '@angular/core';

import { VideoService } from '@app/core/services/video.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  public inputFieldValue: string = '';

  constructor(private videoService: VideoService) {}
  
  public onSubmit(): void {
    this.videoService.addVideo(this.inputFieldValue);
  }
}
