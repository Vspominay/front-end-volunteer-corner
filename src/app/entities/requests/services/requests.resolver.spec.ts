import { TestBed } from '@angular/core/testing';

import { RequestsResolver } from './requests.resolver';

describe('RequestsResolver', () => {
  let resolver: RequestsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(RequestsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
