import { Component, Inject } from '@angular/core';
import { MedService } from '../models/med-service';
import { ApiService } from '../services/api.service';
import { SpecializationService } from '../services/specialization.service';
import { MedservicesService } from '../services/medservices.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Specialization } from '../models/specialization';

@Component({
  selector: 'app-adm-edit-service',
  templateUrl: './adm-edit-service.component.html',
  styleUrls: ['./adm-edit-service.component.scss']
})
export class AdmEditServiceComponent {

  service: MedService;
  change: boolean;
  specs: Specialization[];

  constructor(private specService: SpecializationService,
            private servService: MedservicesService,
            @Inject(MAT_DIALOG_DATA) public data: any,
            public dialogRef: MatDialogRef<AdmEditServiceComponent>,
            public snackBar: MatSnackBar,
            private _router: Router,) {
    this.service = new MedService;
    this.change = false;
  }

  ngOnInit(): void {
    this.service = new MedService;
    this.specService.getSpecializations().subscribe(res => this.specs = [...res]);

    if (this.data.service != undefined) {
      this.service.id = this.data.service.id;
      this.service.name = this.data.service.name;
      this.service.specialization = this.data.service.specialization;
      this.service.description = this.data.service.description;
    }

    this.change = false;
  }

  onSubmit(): void {
    try {
      this.servService.updateService(this.service).subscribe((res: any) => {
        this.snackBar.open('Успешно изменено!', 'Скрыть', {
          duration: 3000
        })
        this.change = true;
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
