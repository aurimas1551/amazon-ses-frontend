import { TestBed } from '@angular/core/testing';

import { ReceivingEmailsService } from './receiving-emails.service';

describe('ReceivingEmailsService', () => {
  let service: ReceivingEmailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReceivingEmailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
