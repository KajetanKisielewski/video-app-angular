import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { HomeComponent } from '@app/home/home.component';
import { SearchBarComponent } from '@app/home/search-bar/search-bar.component';

@NgModule({
  declarations: [
    HomeComponent,
    SearchBarComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule
  ],
  exports: [
    HomeComponent,
  ]
})
export class HomeModule { }
