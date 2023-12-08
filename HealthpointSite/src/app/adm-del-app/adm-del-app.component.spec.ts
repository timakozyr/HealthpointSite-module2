import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmDelAppComponent } from './adm-del-app.component';

describe('AdmDelAppComponent', () => {
  let component: AdmDelAppComponent;
  let fixture: ComponentFixture<AdmDelAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmDelAppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmDelAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
