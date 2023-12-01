import { Component } from '@angular/core';
import { FeedbackFormComponent } from '../feedback-form/feedback-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent {

  constructor(public dialog: MatDialog) {
    
  }

  openFeedbackForm() {
    this.dialog.open(FeedbackFormComponent, {width: '500px', height: '450px'});
  }
}
