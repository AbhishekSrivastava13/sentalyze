import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeochartPage } from './geochart.page';

describe('GeochartPage', () => {
  let component: GeochartPage;
  let fixture: ComponentFixture<GeochartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeochartPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeochartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
