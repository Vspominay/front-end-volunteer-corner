import { TestBed } from '@angular/core/testing';

import { ProposalInformationResolver } from './proposal-information.resolver';

describe('ProposalInformationResolver', () => {
  let resolver: ProposalInformationResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ProposalInformationResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
