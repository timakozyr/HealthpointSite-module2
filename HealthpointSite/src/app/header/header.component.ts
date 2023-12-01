import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentFormComponent } from '../appointment-form/appointment-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(public router: Router, public dialog: MatDialog) {
  }

  openAppointmentForm() {
    this.dialog.open(AppointmentFormComponent);
  }

  ngOnInit(): void {
  }
}
