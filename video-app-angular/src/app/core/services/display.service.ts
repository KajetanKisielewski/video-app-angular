import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { DisplayType } from '@app/core/enums/display-type.enum';

@Injectable({
  providedIn: 'root'
})
export class DisplayService {
  private displayType = DisplayType.List
  private _displayType = new BehaviorSubject<DisplayType>(this.displayType);
  public displayType$ = this._displayType.asObservable();

  constructor() {}

  public displayAsTiles(): void {
    this.displayType = DisplayType.Tiles
    this._displayType.next(this.displayType)
  }

  public displayAsList(): void {
    this.displayType = DisplayType.List
    this._displayType.next(this.displayType)
  }
}
