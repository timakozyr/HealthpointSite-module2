import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmEditAppComponent } from './adm-edit-app.component';

describe('AdmEditAppComponent', () => {
  let component: AdmEditAppComponent;
  let fixture: ComponentFixture<AdmEditAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmEditAppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmEditAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
