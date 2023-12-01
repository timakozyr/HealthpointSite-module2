import { Injectable } from '@angular/core';
import { Doctor } from '../models/doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {

  public doctors: Doctor[];

  constructor() {
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
    doctor.Specialization = spec;
    doctor.id = id;
    doctor.SpecializationDesc = descr;
    this.doctors.push(doctor);
  }

  getDoctors = () => this.doctors;

  getDoctorsSpecs = () => [...new Set(this.doctors.map(doc => doc.Specialization))];

  getDoctorsBySpec = (spec) => this.doctors.filter(doc => doc.Specialization.toLowerCase() == spec.toLowerCase());

  getDoctorNamesBySpec = (spec) => this.doctors.filter(doc => doc.Specialization.toLowerCase() == spec.toLowerCase()).map(d => d.FIO);

  getDoctor = (id) => (id > 0 && id <= this.doctors.length) ? this.doctors[id - 1] : null;

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