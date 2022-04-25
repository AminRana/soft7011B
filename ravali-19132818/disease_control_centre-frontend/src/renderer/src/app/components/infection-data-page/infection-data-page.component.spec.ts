import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfectionDataPageComponent } from './infection-data-page.component';

describe('InfectionDataPageComponent', () => {
  let component: InfectionDataPageComponent;
  let fixture: ComponentFixture<InfectionDataPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfectionDataPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfectionDataPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
