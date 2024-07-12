import { TestBed } from '@angular/core/testing';

import { RegisterStaffService } from './register-staff.service';

describe('RegisterStaffService', () => {
  let service: RegisterStaffService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterStaffService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
