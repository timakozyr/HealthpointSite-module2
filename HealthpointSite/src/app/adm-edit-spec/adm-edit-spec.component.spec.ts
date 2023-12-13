import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmEditSpecComponent } from './adm-edit-spec.component';

describe('AdmEditSpecComponent', () => {
  let component: AdmEditSpecComponent;
  let fixture: ComponentFixture<AdmEditSpecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmEditSpecComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmEditSpecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
