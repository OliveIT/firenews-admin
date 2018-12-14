import { TestBed, inject } from '@angular/core/testing';

import { AboutusService } from './aboutus.service';

describe('AboutusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AboutusService]
    });
  });

  it('should be created', inject([AboutusService], (service: AboutusService) => {
    expect(service).toBeTruthy();
  }));
});
