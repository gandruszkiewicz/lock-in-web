import { TestBed } from '@angular/core/testing';

import { SecuredInformationService } from './secured-information.service';

describe('SecuredInformationService', () => {
  let service: SecuredInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecuredInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
