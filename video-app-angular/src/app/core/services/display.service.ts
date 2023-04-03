import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { DisplayType } from '@app/core/enums/display-type.enum';

@Injectable({
  providedIn: 'root',
})
export class DisplayService implements OnInit {
  private displayType!: DisplayType;
  private _displayType!: BehaviorSubject<DisplayType>;
  public displayType$!: Observable<DisplayType>;

  constructor() {
    this.ngOnInit();
  }

  public ngOnInit(): void {
    this.displayType = DisplayType.List;
    this._displayType = new BehaviorSubject<DisplayType>(this.displayType);
    this.displayType$ = this._displayType.asObservable();
  }

  public displayAsTiles(): void {
    this.displayType = DisplayType.Tiles;
    this._displayType.next(this.displayType);
  }

  public displayAsList(): void {
    this.displayType = DisplayType.List;
    this._displayType.next(this.displayType);
  }
}
