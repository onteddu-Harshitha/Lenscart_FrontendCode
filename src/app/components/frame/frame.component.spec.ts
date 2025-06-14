import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FramesComponent } from './frame.component';

describe('FrameComponent', () => {
  let component: FramesComponent;
  let fixture: ComponentFixture<FramesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FramesComponent]
    });
    fixture = TestBed.createComponent(FramesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
