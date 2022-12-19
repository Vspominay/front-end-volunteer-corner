import { TestBed } from '@angular/core/testing';

import { ProposalsResolver } from './proposals.resolver';

describe('ProposalsResolver', () => {
  let resolver: ProposalsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ProposalsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
