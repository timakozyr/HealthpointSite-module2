import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { ApiService } from './api.service';
import { Appointment } from '../models/appointment';
import { MedservicesService } from './medservices.service';
import { UserService } from './user.service';
import { Observable, map } from 'rxjs';
import { DoctorsService } from './doctors.service';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(@Inject(LOCALE_ID) private locale: string,
              private _api: ApiService,
              private _userService: UserService,
              private _medServicesService: MedservicesService,
              private _doctorService: DoctorsService,
              ) { }

  createNewAppointmentJson(input: any) {
    var to_return = new Appointment;
    to_return.id = input.id;
    to_return.patientId = input.patient;
    to_return.doctorId = input.doctor;
    to_return.date = input.date;
    to_return.cabinet = input.cabinet;
    to_return.medServiceId = input.service;

    return to_return;
}

  getAllAppointments() : Observable<Appointment[]> {
    return this._api.getTypeRequest('appointments').pipe(map((res: any) => res.map(r => this.createNewAppointmentJson(r))));
  }

  addAppointment(appointment: Appointment) {
    let b = {
      "patient": appointment.patientId,
      "doctor": appointment.doctorId,
      "date": formatDate(appointment.date, 'yyyy-MM-dd', this.locale),
      "time": "00:00:00",
      "cabinet": appointment.cabinet,
      "service": appointment.medServiceId
    }
    return this._api.postTypeRequest('appointments', b)
  }

  deleteAppointment(id: number) {
    return this._api.deleteTypeRequest(`appointments/${id}`);
  }
}
