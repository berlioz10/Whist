import { TestBed } from '@angular/core/testing';

import { PlayerRoundService } from './player-round.service';

describe('PlayerRoundService', () => {
  let service: PlayerRoundService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerRoundService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
