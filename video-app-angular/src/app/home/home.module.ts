import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '@app/core/module/material.module';
import { HomeComponent } from '@app/home/home.component';
import { SearchBarComponent } from '@app/home/search-bar/search-bar.component';
import { VideoListComponent } from '@app/home/video-list/video-list.component';
import { VideoItemComponent } from '@app/home/video-list/video-item/video-item.component';

@NgModule({
  declarations: [
    HomeComponent,
    SearchBarComponent,
    VideoListComponent,
    VideoItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  exports: [
    HomeComponent,
    SearchBarComponent
  ]
})
export class HomeModule { }
