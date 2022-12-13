import { TestBed } from '@angular/core/testing';

import { RequestsActionControlService } from './requests-action-control.service';

describe('RequestsActionControlService', () => {
  let service: RequestsActionControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestsActionControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
