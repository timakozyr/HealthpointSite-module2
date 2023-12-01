import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularDoctorsComponent } from './popular-doctors.component';

describe('PopularDoctorsComponent', () => {
  let component: PopularDoctorsComponent;
  let fixture: ComponentFixture<PopularDoctorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopularDoctorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopularDoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
