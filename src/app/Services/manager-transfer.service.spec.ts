import { TestBed } from '@angular/core/testing';

import { ManagerTransferService } from './manager-transfer.service';

describe('ManagerTransferService', () => {
  let service: ManagerTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagerTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
