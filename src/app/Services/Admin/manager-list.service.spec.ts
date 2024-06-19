import { TestBed } from '@angular/core/testing';

import { ManagerListService } from './manager-list.service';

describe('ManagerListService', () => {
  let service: ManagerListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagerListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
