import { Component, EventEmitter } from '@angular/core';
import { MedService } from '../models/med-service';
import { MedservicesService } from '../services/medservices.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SpecializationService } from '../services/specialization.service';
import { Specialization } from '../models/specialization';

@Component({
  selector: 'app-adm-new-service',
  templateUrl: './adm-new-service.component.html',
  styleUrls: ['./adm-new-service.component.scss']
})
export class AdmNewServiceComponent {

  service: MedService = new MedService;
  specs: Specialization[] = [];
  constructor(public dialogRef: MatDialogRef<AdmNewServiceComponent>,
              private _router: Router,
              public medService: MedservicesService,
              public specService: SpecializationService,
              public snackBar: MatSnackBar) {
    this.specs = [];
  }

  ngOnInit(): void {
    this.specService.getSpecializations().subscribe(res => this.specs = res);
  }


  onSubmit() {
    this.addService();
  }

  addService() {
    try {
      this.medService.addService(this.service).subscribe((res: any) => {
        this.snackBar.open('Успешная регистрация!', 'Скрыть', {
          duration: 3000
        });
        this.service.id = res.id;
        this.dialogRef.close();
        this._router.navigateByUrl('/user');
      });
    } catch (err: any) {
      if (err.status === 401) {
        this.snackBar.open('Ошибка регистрации!', 'Undo', {
          duration: 3000
        });
      } else {
        this.snackBar.open('Ошибка на стороне сервера!'), 'Undo', {
          duration: 3000
        };
      }
    }
  }
}
