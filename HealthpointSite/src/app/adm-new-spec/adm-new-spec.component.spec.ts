import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmNewSpecComponent } from './adm-new-spec.component';

describe('AdmNewSpecComponent', () => {
  let component: AdmNewSpecComponent;
  let fixture: ComponentFixture<AdmNewSpecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmNewSpecComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmNewSpecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
