import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { Video } from '@app/core/models/video.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  public embedHtml!: SafeHtml;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public video: Video,
    private sanitizer: DomSanitizer
  ) {}

  public ngOnInit(): void {
    this.embedHtml = this.sanitizer.bypassSecurityTrustHtml(this.video.embedHtml);
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public onCloseDialog(): void {
    this.dialogRef.close();
  }
}
