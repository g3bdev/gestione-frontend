import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertXmlComponent } from './convert-xml.component';

describe('ConvertXmlComponent', () => {
  let component: ConvertXmlComponent;
  let fixture: ComponentFixture<ConvertXmlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConvertXmlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConvertXmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
