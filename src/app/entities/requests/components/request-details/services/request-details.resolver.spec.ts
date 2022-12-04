import { TestBed } from '@angular/core/testing';

import { RequestDetailsResolver } from './request-details.resolver';

describe('RequestDetailsResolver', () => {
  let resolver: RequestDetailsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(RequestDetailsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
