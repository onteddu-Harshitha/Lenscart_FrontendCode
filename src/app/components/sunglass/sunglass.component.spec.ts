import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SunglassComponent } from './sunglass.component';

describe('SunglassComponent', () => {
  let component: SunglassComponent;
  let fixture: ComponentFixture<SunglassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SunglassComponent]
    });
    fixture = TestBed.createComponent(SunglassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
