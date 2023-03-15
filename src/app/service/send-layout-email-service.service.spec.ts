import { TestBed } from '@angular/core/testing';

import { SendLayoutEmailServiceService } from './send-layout-email-service.service';

describe('SendLayoutEmailServiceService', () => {
  let service: SendLayoutEmailServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendLayoutEmailServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
