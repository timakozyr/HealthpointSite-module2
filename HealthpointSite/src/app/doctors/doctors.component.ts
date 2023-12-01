import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Doctor } from '../models/doctor';
import { DoctorsService } from '../services/doctors.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})
export class DoctorsComponent {
  searchTerm = '';
  public doctors: Doctor[];
  breakpoint: number = 3;
  rh = '1.5:1';

  lgScreen = 1500;
  mdScreen = 900;

  resize(targetWidth) {
    if (targetWidth > this.lgScreen) {
      this.breakpoint = 3;
      this.rh = '1.5 : 1';
    } else if (targetWidth <= this.lgScreen && targetWidth > this.mdScreen) {
      this.breakpoint = 2;
      this.rh = '1.25 : 1';
    } else if (targetWidth <= this.mdScreen && targetWidth > 500) {
      this.breakpoint = 1;
      this.rh = '1 : 0.75'
    } else {
      this.breakpoint = 1;
      this.rh = '1 : 1.5';
    }
  }

  ngOnInit() {
    this.resize(window.innerWidth);
  }
  
  onResize(event) {
    this.resize(event.target.innerWidth);
  }
  

  constructor(service: DoctorsService) {
    this.doctors = service.getDoctors();
  }
}