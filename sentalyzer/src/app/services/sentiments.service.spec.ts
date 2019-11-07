import { TestBed } from '@angular/core/testing';

import { SentimentsService } from './sentiments.service';

describe('SentimentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SentimentsService = TestBed.get(SentimentsService);
    expect(service).toBeTruthy();
  });
});
