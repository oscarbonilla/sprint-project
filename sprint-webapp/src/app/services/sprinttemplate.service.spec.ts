import { TestBed, inject } from '@angular/core/testing';

import { SprinttemplateService } from './sprinttemplate.service';

describe('SprinttemplateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SprinttemplateService]
    });
  });

  it('should be created', inject([SprinttemplateService], (service: SprinttemplateService) => {
    expect(service).toBeTruthy();
  }));
});
