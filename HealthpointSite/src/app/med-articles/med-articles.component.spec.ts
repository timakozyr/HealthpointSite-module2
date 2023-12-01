import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedArticlesComponent } from './med-articles.component';

describe('MedArticlesComponent', () => {
  let component: MedArticlesComponent;
  let fixture: ComponentFixture<MedArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedArticlesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
