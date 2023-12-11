import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { ApiService } from './api.service';
import { Appointment } from '../models/appointment';
import { Observable, map } from 'rxjs';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(@Inject(LOCALE_ID) private locale: string,
              private _api: ApiService) { }

  createNewAppointmentJson(input: any) {
    var to_return = new Appointment;
    to_return.id = input.id;
    to_return.patientId = input.patient;
    to_return.doctorId = input.doctor;
    to_return.date = input.date;
    to_return.cabinet = input.cabinet;
    to_return.medServiceId = input.service;
    to_return.time = input.time;

    return to_return;
  }

  appointmentToJson(appointment: Appointment) {
    return {
      "patient": appointment.patientId,
      "doctor": appointment.doctorId,
      "date": formatDate(appointment.date, 'yyyy-MM-dd', this.locale),
      "time": appointment.time,
      "cabinet": appointment.cabinet,
      "service": appointment.medServiceId
    }
  }

  getAllAppointments() : Observable<Appointment[]> {
    return this._api.getTypeRequest('appointments').pipe(map((res: any) => res.map(r => this.createNewAppointmentJson(r))));
  }

  getAppointmentById(id: number) : Observable<Appointment> {
    return this._api.getTypeRequest(`appointments/${id}`).pipe(map(res => this.createNewAppointmentJson(res)));
  }

  addAppointment(appointment: Appointment) {
    let b = this.appointmentToJson(appointment);
    return this._api.postTypeRequest('appointments', b)
  }

  updateAppointment(appointment: Appointment) {
    let b = this.appointmentToJson(appointment);
    return this._api.putTypeRequest(`appointments/${appointment.id}`, b);
  }

  deleteAppointment(id: number) {
    return this._api.deleteTypeRequest(`appointments/${id}`);
  }
}
