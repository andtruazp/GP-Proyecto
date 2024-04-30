import { TestBed } from '@angular/core/testing';

import { IdUsuarioService } from './id-usuario.service';

describe('IdUsuarioService', () => {
  let service: IdUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
