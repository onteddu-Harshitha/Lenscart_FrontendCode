import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlassComponent } from './glass.component';

describe('GlassComponent', () => {
  let component: GlassComponent;
  let fixture: ComponentFixture<GlassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GlassComponent]
    });
    fixture = TestBed.createComponent(GlassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
