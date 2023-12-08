import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmNewServiceComponent } from './adm-new-service.component';

describe('AdmNewServiceComponent', () => {
  let component: AdmNewServiceComponent;
  let fixture: ComponentFixture<AdmNewServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmNewServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmNewServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
