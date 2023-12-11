import { Injectable } from '@angular/core';
import { MedService } from '../models/med-service';
import { ApiService } from './api.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedservicesService {

  
  constructor(private _api: ApiService) {
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

  serviceToJson(service: MedService) {
    return {
      "name": service.name,
      "specialization": 0+service.specialization,
      "bio": service.description
    }
  }

  getAllServices() : Observable<MedService[]> {
    return this._api.getTypeRequest('services/').pipe(map((res: any) => res.map(r => this.createNewMedServiceJson(r))));
  }

  getServiceById(serviceId) : Observable<MedService> {
    return this._api.getTypeRequest(`services/${serviceId}`).pipe(map(res => this.createNewMedServiceJson(res)));
  }

  addService(service: MedService) {
    let b = this.serviceToJson(service);
    return this._api.postTypeRequest('services', b);
  }

  updateService(service: MedService) {
    let b = this.serviceToJson(service);
    return this._api.putTypeRequest(`services/${service.id}`, b);
  }

  deleteService(id: number) {
    return this._api.deleteTypeRequest(`services/${id}`);
  }
  
}
