import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedServiceDescrComponent } from './med-service-descr.component';

describe('MedServiceDescrComponent', () => {
  let component: MedServiceDescrComponent;
  let fixture: ComponentFixture<MedServiceDescrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedServiceDescrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedServiceDescrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
