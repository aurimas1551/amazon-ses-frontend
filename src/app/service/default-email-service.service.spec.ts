import { TestBed } from '@angular/core/testing';

import { DefaultEmailServiceService } from './default-email-service.service';

describe('DefaultEmailServiceService', () => {
  let service: DefaultEmailServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultEmailServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
