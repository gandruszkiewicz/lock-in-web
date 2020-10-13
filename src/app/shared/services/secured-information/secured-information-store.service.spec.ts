import { TestBed } from '@angular/core/testing';

import { SecuredInformationStoreService } from './secured-information-store.service';

describe('SecuredInformationStoreService', () => {
  let service: SecuredInformationStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecuredInformationStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
