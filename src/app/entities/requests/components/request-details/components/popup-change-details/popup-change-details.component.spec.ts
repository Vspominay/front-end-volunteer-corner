import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupChangeDetailsComponent } from './popup-change-details.component';

describe('PopupChangeDetailsComponent', () => {
  let component: PopupChangeDetailsComponent;
  let fixture: ComponentFixture<PopupChangeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupChangeDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupChangeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
