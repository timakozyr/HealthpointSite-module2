import { Injectable } from '@angular/core';
import { Doctor } from '../models/doctor';
import { Observable, map } from 'rxjs';
import { ApiService } from './api.service';
import { User } from '../models/user';
import { SpecializationService } from './specialization.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {

  public doctors: Doctor[];

  constructor(private _api: ApiService, private specService: SpecializationService) {
    this.doctors = [];
    this.createDoctor("Иванов Иван Иванович", "Терапевт", 1, TEXT_TERAPEVT);
    this.createDoctor("Николаев Николай Николаевич", "Хирург", 2, TEXT_SURGEON);
    this.createDoctor("Игорьев Игорь Игоревич", "Офтальмолог", 3, TEXT_OKULIST);
    this.createDoctor("Дмитриев Дмитрий Дмитриевич", "Отоларинголог", 4, TEXT_LOR);
    this.createDoctor("Сергеев Сергей Сергеевич", "Ортопед", 5, TEXT_ORTOPED);
    this.createDoctor("Максимов Максим Максимович", "Терапевт", 6, TEXT_TERAPEVT);
    this.createDoctor("Данилов Даниил Данилович", "Терапевт", 7, TEXT_TERAPEVT);
    this.createDoctor("Сидоров Сидор Сидорович", "Хирург", 8, TEXT_SURGEON);
    this.createDoctor("Павлов Павел Павлович", "Хирург", 9, TEXT_SURGEON);
    this.createDoctor("Егоров Егор Егорович", "Офтальмолог", 10, TEXT_OKULIST);
    this.createDoctor("Семенов Семен Семенович", "Офтальмолог", 11, TEXT_OKULIST);
    this.createDoctor("Еленова Елена Еленовна", "Отоларинголог", 12, TEXT_LOR);
    this.createDoctor("Светланова Светлана Светлановна", "Отоларинголог", 13, TEXT_LOR);
    this.createDoctor("Маринова Марина Мариновна", "Ортопед", 14, TEXT_ORTOPED);
    this.createDoctor("Васильева Василиса Васильевна", "Ортопед", 15, TEXT_ORTOPED);
  }

  createDoctor(fio: string, spec: string, id: number, descr: string) {
    let doctor = new Doctor();
    doctor.FIO = fio;
    doctor.specialization = spec;
    doctor.id = id;
    doctor.specializationDesc = descr;
    this.doctors.push(doctor);
  }

  createNewDoctorJson(input: any) {
    var doctor = new Doctor;
    doctor.id = input.id;
    doctor.FIO = input.user.last_name + " " + input.user.first_name + " " + input.user.patronymic_name;
    doctor.specializationId = input.specialization;
    this.specService.getSpecializationById(doctor.specializationId).subscribe(
      res => {
        let spec = this.specService.createNewSpecJson(res);
        doctor.specialization = spec.name;
        doctor.specializationDesc = spec.description;
      }
    );

    return doctor;
  }

  register(user: User, specialization: number) {
    let b = {
      "user" : {
        "email" : user.email,
        "first_name": user.first_name,
        "patronymic_name": user.patronymics,
        "last_name": user.last_name,
        "city": user.city,
        "password": user.password
      },
      "specialization": specialization
    }
    
    return this._api.postTypeRequest('doctors', b);
  }

  getDoctors() : Observable<Doctor[]> {
    return this._api.getTypeRequest('doctors').pipe(map((res: any) => res.map(r => this.createNewDoctorJson(r))));
  }

  getDoctor = (id) => (id > 0 && id <= this.doctors.length) ? this.doctors[id - 1] : null;

  deleteDoctor(id: number) {
    return this._api.deleteTypeRequest(`doctors/${id}`);
  }

}

const TEXT_SURGEON = `
Хирург — это врач, который специализируется на оперативном лечении различных заболеваний и травм человеческого организма. Он проводит операции различной сложности, используя современные методы анестезии и техники хирургического вмешательства.
`;

const TEXT_TERAPEVT = `
Терапевт — это врач, который занимается диагностикой и лечением различных заболеваний внутренних органов. Он является первым контактом пациента с системой здравоохранения и играет ключевую роль в поддержании здоровья населения.
`;

const TEXT_OKULIST = `
Офтальмолог — это врач, который специализируется на диагностике и лечении заболеваний глаз. Он проводит различные виды обследований глаз, включая проверку зрения, измерение давления внутри глаза и осмотр глазного дна.
`;

const TEXT_LOR = `
Отоларинголог — это врач, специализирующийся на диагностике и лечении заболеваний уха, горла и носа. Он проводит осмотр пациента, выявляет симптомы заболевания и назначает соответствующее лечение. Врач может использовать различные методы лечения, такие как применение лекарственных препаратов, проведение хирургических операций или физиотерапевтических процедур. Кроме того, отоларинголог может заниматься профилактикой заболеваний органов дыхания и слуха, проводить профилактические осмотры и рекомендовать пациентам меры по укреплению иммунитета.
`;

const TEXT_ORTOPED = `
Ортопед — это врач, который занимается диагностикой и лечением заболеваний опорно-двигательного аппарата. Он проводит осмотр пациента, выявляет симптомы заболевания и назначает соответствующее лечение. Ортопед может использовать различные методы лечения, такие как применение лекарственных препаратов, проведение хирургических операций или физиотерапевтических процедур. Кроме того, ортопед может заниматься профилактикой заболеваний опорно-двигательного аппарата, проводить профилактические осмотры и рекомендовать пациентам меры по укреплению мышц и костей.
`;