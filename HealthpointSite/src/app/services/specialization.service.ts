import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map } from 'rxjs';
import { Specialization } from '../models/specialization';

@Injectable({
  providedIn: 'root'
})
export class SpecializationService {

  constructor(private _api: ApiService) {
  }

  createNewSpecJson(input: any) {
    let to_return = new Specialization;
    to_return.id = input.id;
    to_return.name = input.name;
    to_return.description = input.description;

    return to_return;
  }

  specToJson(spec: Specialization) {
    return {
      'name': spec.name,
      'description': spec.description
    };
  }

  getSpecializations() {
    return this._api.getTypeRequest('specializations').pipe(map((res: any) => res.map(r => this.createNewSpecJson(r))));;
  }

  addSpecialization(spec: Specialization) {
    let b = this.specToJson(spec);
    return this._api.postTypeRequest('specializations', b);
  }

  updateSpecialization(spec: Specialization) {
    let b = this.specToJson(spec);
    
    return this._api.putTypeRequest(`specializations/${spec.id}`, b);
  }

  deleteSpecialization(id: number) {
    return this._api.deleteTypeRequest(`specializations/${id}`);
  }

  getSpecializationById(id: number) {
    return this._api.getTypeRequest(`specializations/${id}`).pipe(map(res => this.createNewSpecJson(res)));
  }
}
