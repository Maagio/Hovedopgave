import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionOverviewPage } from './section-overview.page';

describe('SectionOverviewPage', () => {
  let component: SectionOverviewPage;
  let fixture: ComponentFixture<SectionOverviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionOverviewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionOverviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
