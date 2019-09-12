import { TestBed } from '@angular/core/testing';

import { PreferredGenreService } from './preferred-genre.service';

describe('PreferredGenreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PreferredGenreService = TestBed.get(PreferredGenreService);
    expect(service).toBeTruthy();
  });
});
