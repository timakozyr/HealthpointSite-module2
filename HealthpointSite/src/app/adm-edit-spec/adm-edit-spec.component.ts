import { Component, Inject } from '@angular/core';
import { Specialization } from '../models/specialization';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SpecializationService } from '../services/specialization.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-adm-edit-spec',
  templateUrl: './adm-edit-spec.component.html',
  styleUrls: ['./adm-edit-spec.component.scss']
})
export class AdmEditSpecComponent {
  change: boolean;
  spec: Specialization;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<AdmEditSpecComponent>,
              private _router: Router,
              public specService: SpecializationService,
              public snackBar: MatSnackBar) {
    this.spec = new Specialization;
    this.change = false;
  }

  ngOnInit(): void {
    this.spec = new Specialization;
    this.change = false;
    
    if (this.data.spec != undefined) {
      this.spec.id = this.data.spec.id;
      this.spec.name = this.data.spec.name;
      this.spec.description = this.data.spec.description;
    }
  }


  onSubmit() {
    this.editSpec();
  }

  editSpec() {
    try {
      this.specService.updateSpecialization(this.spec).subscribe((res: any) => {
        this.snackBar.open('Успешно изменено!', 'Скрыть', {
          duration: 3000
        });
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
