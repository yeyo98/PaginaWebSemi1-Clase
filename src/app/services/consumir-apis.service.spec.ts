import { TestBed } from '@angular/core/testing';

import { ConsumirApisService } from './consumir-apis.service';

describe('ConsumirApisService', () => {
  let service: ConsumirApisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsumirApisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
