import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KezdoLapComponent } from './kezdo-lap.component';

describe('KezdoLapComponent', () => {
  let component: KezdoLapComponent;
  let fixture: ComponentFixture<KezdoLapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KezdoLapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KezdoLapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
