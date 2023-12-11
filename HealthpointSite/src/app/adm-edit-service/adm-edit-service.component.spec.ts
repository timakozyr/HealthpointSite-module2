import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmEditServiceComponent } from './adm-edit-service.component';

describe('AdmEditServiceComponent', () => {
  let component: AdmEditServiceComponent;
  let fixture: ComponentFixture<AdmEditServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmEditServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmEditServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
