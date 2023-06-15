import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePlantsComponent } from './manage-plants.component';

describe('ManagePlantsComponent', () => {
  let component: ManagePlantsComponent;
  let fixture: ComponentFixture<ManagePlantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagePlantsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagePlantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
