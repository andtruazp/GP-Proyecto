import { TestBed } from '@angular/core/testing';

import { ControlUService } from './control-u.service';

describe('ControlUService', () => {
  let service: ControlUService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlUService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
