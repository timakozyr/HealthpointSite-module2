import { TestBed } from '@angular/core/testing';

import { MedservicesService } from './medservices.service';

describe('MedservicesService', () => {
  let service: MedservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
