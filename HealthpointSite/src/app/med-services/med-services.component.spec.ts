import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedServicesComponent } from './med-services.component';

describe('MedServicesComponent', () => {
  let component: MedServicesComponent;
  let fixture: ComponentFixture<MedServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedServicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
