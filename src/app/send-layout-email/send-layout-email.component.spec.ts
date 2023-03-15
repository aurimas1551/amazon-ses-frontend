import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendLayoutEmailComponent } from './send-layout-email.component';

describe('SendLayoutEmailComponent', () => {
  let component: SendLayoutEmailComponent;
  let fixture: ComponentFixture<SendLayoutEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendLayoutEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendLayoutEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
