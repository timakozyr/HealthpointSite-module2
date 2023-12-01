import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Feedback } from '../models/feedback';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss']
})
export class FeedbackFormComponent {

  feedback!: Feedback;

  constructor(public dialogRef: MatDialogRef<FeedbackFormComponent>,) {
    dialogRef.disableClose = false;
  }

  ngOnInit(): void {
    this.feedback = new Feedback();
  }

  onSubmit(): void {
    this.dialogRef.close();
  }

}
