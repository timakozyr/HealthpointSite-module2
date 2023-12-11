import { Injectable } from '@angular/core';
import { Doctor } from '../models/doctor';
import { Observable, map } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {

  constructor(private _api: ApiService) {
  }

  createNewDoctorJson(input: any) {
    var doctor = new Doctor;
    doctor.doctorId = input.id;
    doctor.id = input.user.id;
    doctor.specialization = input.specialization;
    doctor.last_name = input.user.last_name;
    doctor.first_name = input.user.first_name;
    doctor.patronymics = input.user.patronymic_name;
    doctor.FIO = doctor.last_name + " " + doctor.first_name + " " + doctor.patronymics;

    return doctor;
  }

  doctorToJson(doctor: Doctor) {
    return {
      "user" : {
        "email" : doctor.email,
        "first_name": doctor.first_name,
        "patronymic_name": doctor.patronymics,
        "last_name": doctor.last_name,
        "city": doctor.city,
        "password": doctor.password
      },
      "specialization": doctor.specialization
    };
  }

  register(doctor: Doctor) {
    let b = this.doctorToJson(doctor);
    
    return this._api.postTypeRequest('doctors', b);
  }

  updateDoctor(doctor: Doctor) {
    let b = this.doctorToJson(doctor);
    
    return this._api.putTypeRequest(`doctors/${doctor.doctorId}`, b);
  }

  getDoctors() : Observable<Doctor[]> {
    return this._api.getTypeRequest('doctors').pipe(map((res: any) => res.map(r => this.createNewDoctorJson(r))));
  }

  getDoctor(id: number) : Observable<Doctor> {
    return this._api.getTypeRequest(`doctors/${id}`).pipe(map(res => this.createNewDoctorJson(res)));
  }

  deleteDoctor(id: number) {
    return this._api.deleteTypeRequest(`doctors/${id}`);
  }

}
