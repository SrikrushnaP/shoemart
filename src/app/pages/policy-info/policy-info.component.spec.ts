import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyInfoComponent } from './policy-info.component';

describe('PolicyInfoComponent', () => {
  let component: PolicyInfoComponent;
  let fixture: ComponentFixture<PolicyInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolicyInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolicyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
