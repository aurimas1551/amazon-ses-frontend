import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendDefaultEmailComponent } from './send-default-email.component';

describe('SendDefaultEmailComponent', () => {
  let component: SendDefaultEmailComponent;
  let fixture: ComponentFixture<SendDefaultEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendDefaultEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendDefaultEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
