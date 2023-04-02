import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '@app/core/module/material.module';
import { HomeComponent } from '@app/home/home.component';
import { SearchBarComponent } from '@app/home/search-bar/search-bar.component';
import { VideoListComponent } from '@app/home/video-list/video-list.component';
import { VideoItemComponent } from '@app/home/video-list/video-item/video-item.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    HomeComponent,
    SearchBarComponent,
    VideoListComponent,
    VideoItemComponent,
    DashboardComponent,
    NavBarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
