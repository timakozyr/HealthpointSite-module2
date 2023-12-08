import { Injectable } from '@angular/core';
import { MedService } from '../models/med-service';
import { ApiService } from './api.service';
import { Observable, map } from 'rxjs';
import { DoctorsService } from './doctors.service';

@Injectable({
  providedIn: 'root'
})
export class MedservicesService {

  
  constructor(private _api: ApiService, private doctorsService: DoctorsService) {
  }

  createMedService(name: string, specialization: number, id: number, description: string, pic: string) {
    let medService = new MedService();
    medService.name = name;
    medService.specialization = specialization;
    medService.id = id;
    medService.description = description;
    medService.pic = pic;
    
    return medService;
  }

  createNewMedServiceJson(input: any) {
    var to_return = new MedService;
    to_return.id = input.id;
    to_return.name = input.name;
    to_return.specialization = input.specialization;
    to_return.description = input.bio;

    return to_return;
  }

  getAllServices() : Observable<MedService[]> {
    return this._api.getTypeRequest('services/').pipe(map((res: any) => res.map(r => this.createNewMedServiceJson(r))));
  };

  getServiceById(serviceId) : Observable<MedService> {
    return this._api.getTypeRequest(`services/${serviceId}`).pipe(map(res => this.createNewMedServiceJson(res)));
  }

  addService(service: MedService) {
    let b = {
      "name": service.name,
      "specialization": 0+service.specialization,
      "bio": service.description
    }
    return this._api.postTypeRequest('services', b);
  }

  deleteService(id: number) {
    return this._api.deleteTypeRequest(`services/${id}`);
  }
  
}

const terapevtDesc = "Терапевт проводит осмотр пациента, чтобы оценить его общее состояние здоровья, выявить возможные заболевания или проблемы со здоровьем и назначить соответствующее лечение. Осмотр включает в себя измерение артериального давления, пульса, температуры тела, а также проведение других необходимых исследований для диагностики заболеваний.";

const bloodAnalyzeDesc = "Результаты ОАК позволяют врачу поставить предварительный диагноз и начать лечение в соответствии с рекомендациями врача-терапевта. Лаборатория проводит исследование и выдает результаты анализа в течение нескольких часов или дней.";

const dispanserDesc = "Во время диспансеризации пациент проходит ряд медицинских обследований, включая общий анализ крови, биохимический анализ крови, анализ мочи, электрокардиограмму, флюорографию легких и другие исследования. Врач-терапевт оценивает результаты всех проведенных исследований и дает рекомендации по дальнейшему лечению и профилактике заболеваний.";

const ekgDesc = "ЭКГ помогает выявить различные заболевания сердца, такие как инфаркт миокарда, стенокардию, аритмии и другие нарушения работы сердечно-сосудистой системы. Результаты ЭКГ помогают врачу определить необходимость проведения дополнительных исследований, например, УЗИ сердца, для уточнения диагноза и назначения эффективного лечения.";

const vacDesc = "Вакцинация от COVID-19 - это процесс введения в организм человека вакцины, которая помогает защитить его от инфекции коронавирусом. Эта процедура проводится для профилактики заболевания и снижения риска развития тяжелых форм COVID-19.";

const fluroDesc = "Флюорография является очень важным методом диагностики заболеваний легких, так как позволяет выявить ранние стадии рака легких, туберкулез и другие заболевания. Кроме того, данная процедура помогает контролировать состояние здоровья курильщиков и людей с повышенным риском развития заболеваний легких.";

const mrtDesc = "Магнитно-резонансная томография (МРТ) — это метод диагностики заболеваний, который использует магнитные поля и радиоволны для создания подробного изображения внутренних органов и тканей человека. Процедура МРТ обычно занимает около 30 минут и не вызывает неприятных ощущений. Однако перед ее проведением необходимо проконсультироваться со специалистом.";

const ktDesc = "Компьютерная томография (КТ) — это метод диагностики заболеваний, который использует рентгеновские лучи и компьютерную технологию для создания подробного изображения внутренних органов и тканей человека. Процедура КТ обычно занимает около 15-30 минут и не вызывает неприятных ощущений. Однако перед ее проведением необходимо проконсультироваться со специалистом.";




