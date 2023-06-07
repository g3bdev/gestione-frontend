import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyHoursComponent } from './daily-hours.component';

describe('DailyHoursComponent', () => {
  let component: DailyHoursComponent;
  let fixture: ComponentFixture<DailyHoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyHoursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
