import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoFComponent } from './demo-f.component';

describe('DemoFComponent', () => {
  let component: DemoFComponent;
  let fixture: ComponentFixture<DemoFComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DemoFComponent]
    });
    fixture = TestBed.createComponent(DemoFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
