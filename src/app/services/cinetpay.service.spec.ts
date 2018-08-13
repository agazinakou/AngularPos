import { TestBed, inject } from '@angular/core/testing';

import { CinetpayService } from './cinetpay.service';

describe('CinetpayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CinetpayService]
    });
  });

  it('should be created', inject([CinetpayService], (service: CinetpayService) => {
    expect(service).toBeTruthy();
  }));
});
