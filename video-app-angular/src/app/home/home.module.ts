import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

@NgModule({
  declarations: [
    HomeComponent,
    SearchBarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HomeComponent,
    SearchBarComponent
  ]
})
export class HomeModule { }
