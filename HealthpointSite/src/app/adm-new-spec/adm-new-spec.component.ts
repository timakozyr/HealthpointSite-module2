import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Specialization } from '../models/specialization';
import { Router } from '@angular/router';
import { SpecializationService } from '../services/specialization.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-adm-new-spec',
  templateUrl: './adm-new-spec.component.html',
  styleUrls: ['./adm-new-spec.component.scss']
})
export class AdmNewSpecComponent {
  spec: Specialization;
  constructor(public dialogRef: MatDialogRef<AdmNewSpecComponent>,
              private _router: Router,
              public specService: SpecializationService,
              public snackBar: MatSnackBar) {
    this.spec = new Specialization;
  }

  ngOnInit(): void {
    this.spec = new Specialization;
  }


  onSubmit() {
    this.addSpec();
  }

  addSpec() {
    try {
      this.specService.addSpecialization(this.spec).subscribe((res: any) => {
        this.snackBar.open('Успешно добавлено!', 'Скрыть', {
          duration: 3000
        });
        this.spec.id = res.id;
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
