import { Component } from '@angular/core';
import { Doctor } from '../models/doctor';
import { DoctorsService } from '../services/doctors.service';
import { SpecializationService } from '../services/specialization.service';
import { Specialization } from '../models/specialization';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})
export class DoctorsComponent {
  searchTerm = '';
  public doctors: Doctor[];
  specs: Specialization[];
  breakpoint: number = 3;
  rh = '1.5:1';

  lgScreen = 1500;
  mdScreen = 900;

  constructor(private doctorService: DoctorsService, private specService: SpecializationService) {
    this.doctors = [];
  }

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
    this.doctorService.getDoctors().subscribe(res => this.doctors = [...res]);
    this.specService.getSpecializations().subscribe(res => this.specs = [...res])
  }
  
  onResize(event) {
    this.resize(event.target.innerWidth);
  }

  getSpecializationDesc(specId) {
    return this.specs.find(s => s.id == specId)?.description;
  }

  getSpecializationName(specId) {
    return this.specs.find(s => s.id == specId)?.name;
  }
}