import { Component, Inject, OnInit } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-leavetype',
  templateUrl: './leavetype.component.html',
  styleUrls: ['./leavetype.component.css'],
})
export class LeavetypeComponent {
  constructor(
    public dialogRef: MatDialogRef<LeavetypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: String,
  ) {}

  onNoClick(): void {
    this.dialogRef.close()
  }
}
