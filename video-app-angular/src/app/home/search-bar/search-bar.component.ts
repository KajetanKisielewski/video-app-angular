import { Component } from '@angular/core';

import { ApiService } from '../../core/services/api.service'

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  inputFieldValue:string = '';

  constructor(private apiService: ApiService) {}
  
  public onSubmit = (): void => {
    this.apiService.getVideo(this.inputFieldValue)
  }
}
