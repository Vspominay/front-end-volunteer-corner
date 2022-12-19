import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCreateResponseComponent } from './popup-create-response.component';

describe('PopupCreateResponseComponent', () => {
  let component: PopupCreateResponseComponent;
  let fixture: ComponentFixture<PopupCreateResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PopupCreateResponseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupCreateResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
