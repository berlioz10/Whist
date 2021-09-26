import { TestBed } from '@angular/core/testing';

import { SetPlayersService } from './set-players.service';

describe('SetPlayersService', () => {
  let service: SetPlayersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetPlayersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
