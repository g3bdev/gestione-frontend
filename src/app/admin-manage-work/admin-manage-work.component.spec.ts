import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageWorkComponent } from './admin-manage-work.component';

describe('AdminManageWorkComponent', () => {
  let component: AdminManageWorkComponent;
  let fixture: ComponentFixture<AdminManageWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminManageWorkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminManageWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
