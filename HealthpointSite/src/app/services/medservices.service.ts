import { Injectable } from '@angular/core';
import { MedService } from '../models/med-service';

@Injectable({
  providedIn: 'root'
})
export class MedservicesService {

  allServices: MedService[];
  constructor() {
    this.allServices = [];
    this.createMedService("Общий осмотр у терапевта", "services", 1, terapevtDesc, "assets/images/terapevt.jpeg");
    this.createMedService("Прохождение диспансеризации", "services", 2, dispanserDesc, "assets/images/dispanser.jpg");
    this.createMedService("Общий анализ крови", "analyzes", 3, bloodAnalyzeDesc, "assets/images/laboratory.jpg");
    this.createMedService("ЭКГ", "analyzes", 4, ekgDesc, "assets/images/ekg.jpg");
    this.createMedService("Вакцинация от COVID-19", "services", 5, vacDesc, "");
    this.createMedService("Флюорография", "analyzes", 6, fluroDesc, "");
    this.createMedService("МРТ", "analyzes", 7, mrtDesc, "");
    this.createMedService("КТ", "analyzes", 8, ktDesc, "");
    
  }

  createMedService(name: string, category: string, id: number, description: string, pic: string) {
    let medService = new MedService();
    medService.name = name;
    medService.category = category;
    medService.id = id;
    medService.description = description;
    medService.pic = pic;
    this.allServices.push(medService)
  }

  filterByCategory(categoryName: string) {
    return this.allServices.filter(el => el.category.trim().toLowerCase() == categoryName.trim().toLowerCase());
  }

  getAllServices = () => this.allServices;

  getAllServicesNames = () => this.allServices.map(s => s.name);
}

const terapevtDesc = "Терапевт проводит осмотр пациента, чтобы оценить его общее состояние здоровья, выявить возможные заболевания или проблемы со здоровьем и назначить соответствующее лечение. Осмотр включает в себя измерение артериального давления, пульса, температуры тела, а также проведение других необходимых исследований для диагностики заболеваний.";

const bloodAnalyzeDesc = "Результаты ОАК позволяют врачу поставить предварительный диагноз и начать лечение в соответствии с рекомендациями врача-терапевта. Лаборатория проводит исследование и выдает результаты анализа в течение нескольких часов или дней.";

const dispanserDesc = "Во время диспансеризации пациент проходит ряд медицинских обследований, включая общий анализ крови, биохимический анализ крови, анализ мочи, электрокардиограмму, флюорографию легких и другие исследования. Врач-терапевт оценивает результаты всех проведенных исследований и дает рекомендации по дальнейшему лечению и профилактике заболеваний.";

const ekgDesc = "ЭКГ помогает выявить различные заболевания сердца, такие как инфаркт миокарда, стенокардию, аритмии и другие нарушения работы сердечно-сосудистой системы. Результаты ЭКГ помогают врачу определить необходимость проведения дополнительных исследований, например, УЗИ сердца, для уточнения диагноза и назначения эффективного лечения.";

const vacDesc = "Вакцинация от COVID-19 - это процесс введения в организм человека вакцины, которая помогает защитить его от инфекции коронавирусом. Эта процедура проводится для профилактики заболевания и снижения риска развития тяжелых форм COVID-19.";

const fluroDesc = "Флюорография является очень важным методом диагностики заболеваний легких, так как позволяет выявить ранние стадии рака легких, туберкулез и другие заболевания. Кроме того, данная процедура помогает контролировать состояние здоровья курильщиков и людей с повышенным риском развития заболеваний легких.";

const mrtDesc = "Магнитно-резонансная томография (МРТ) — это метод диагностики заболеваний, который использует магнитные поля и радиоволны для создания подробного изображения внутренних органов и тканей человека. Процедура МРТ обычно занимает около 30 минут и не вызывает неприятных ощущений. Однако перед ее проведением необходимо проконсультироваться со специалистом.";

const ktDesc = "Компьютерная томография (КТ) — это метод диагностики заболеваний, который использует рентгеновские лучи и компьютерную технологию для создания подробного изображения внутренних органов и тканей человека. Процедура КТ обычно занимает около 15-30 минут и не вызывает неприятных ощущений. Однако перед ее проведением необходимо проконсультироваться со специалистом.";




