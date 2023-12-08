import { Component } from '@angular/core';
import { User, UserProfile } from '../models/user';
import { UserService } from '../services/user.service';
import { Appointment } from '../models/appointment';
import { Router } from '@angular/router';
import { AppointmentService } from '../services/appointment.service';
import { DoctorsService } from '../services/doctors.service';
import { SpecializationService } from '../services/specialization.service';
import { MedservicesService } from '../services/medservices.service';
import { Doctor } from '../models/doctor';
import { MedService } from '../models/med-service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments-list.component.html',
  styleUrls: ['./appointments-list.component.scss'],
  animations: []
})
export class AppointmentsListComponent {
  breakpoint: number = 2;
  rh = '1:1.5';
  UserProfileType = UserProfile;
  appointments: Appointment[];
  doctors: Doctor[];
  services: MedService[];

  resize(targetWidth) {
    if (targetWidth > 435) {
      this.breakpoint = 2;
      this.rh = '1:1.5';
    } else if (targetWidth > 340) {
      this.breakpoint = 1;
      this.rh = '1:1';
    } else {
      this.breakpoint = 1;
      this.rh = '1:1.5';
    }
  }
  
  onResize(event) {
    this.resize(event.target.innerWidth);
  }

  columnsToDisplay: string[] = ['date', 'medService', 'visiting', 'actions'];
  expandedElement!: Appointment | null;
  user: User = UserService.CurrentUser;

  constructor(
    private appointmentService: AppointmentService,
    private router: Router,
    private doctorService: DoctorsService,
    private userService: UserService,
    private medServiceService: MedservicesService)
  {

    this.appointments = [];
    this.services = [];
    this.doctors = [];
  }

  ngOnInit(): void {
    if (!UserService.checkUser()) this.router.navigateByUrl('/');
    this.resize(window.innerWidth);

    this.doctorService.getDoctors().subscribe((res) => this.doctors = [...res]);
    this.medServiceService.getAllServices().subscribe(res => this.services = [...res]);
    this.appointmentService.getAllAppointments().subscribe(res => this.appointments = [...res]);
  }

  getDoctorById(id: number) {
    return this.doctors.find(d => d.id == id);
  }

  getServiceById(id: number) {
    return this.services.find(s => s.id == id);
  }

  getUserById(id: number) {
    let user = new User;
    this.userService.getUserById(id).subscribe(res => user = res);
    return user;
  }
}


