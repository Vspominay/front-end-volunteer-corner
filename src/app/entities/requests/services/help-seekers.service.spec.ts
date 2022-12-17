import { TestBed } from '@angular/core/testing';

import { HelpSeekersService } from './help-seekers.service';

describe('HelpSeekersService', () => {
  let service: HelpSeekersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HelpSeekersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
