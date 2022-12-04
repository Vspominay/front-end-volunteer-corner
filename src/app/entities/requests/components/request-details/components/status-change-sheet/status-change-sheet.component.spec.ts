import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusChangeSheetComponent } from './status-change-sheet.component';

describe('StatusChangeSheetComponent', () => {
  let component: StatusChangeSheetComponent;
  let fixture: ComponentFixture<StatusChangeSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusChangeSheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusChangeSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
