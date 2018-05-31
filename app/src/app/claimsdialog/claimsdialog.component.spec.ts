import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimsDialogComponent } from './claimsdialog.component';

describe('DialogComponent', () => {
  let component: ClaimsDialogComponent;
  let fixture: ComponentFixture<ClaimsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
