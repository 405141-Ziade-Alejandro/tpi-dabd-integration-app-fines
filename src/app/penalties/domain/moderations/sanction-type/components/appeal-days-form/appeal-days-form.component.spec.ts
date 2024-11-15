import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppealDaysFormComponent } from './appeal-days-form.component';

describe('AppealDaysFormComponent', () => {
  let component: AppealDaysFormComponent;
  let fixture: ComponentFixture<AppealDaysFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppealDaysFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppealDaysFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
