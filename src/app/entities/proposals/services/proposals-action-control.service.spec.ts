import { TestBed } from '@angular/core/testing';

import { ProposalsActionControlService } from './proposals-action-control.service';

describe('ProposalsActionControlService', () => {
  let service: ProposalsActionControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProposalsActionControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
