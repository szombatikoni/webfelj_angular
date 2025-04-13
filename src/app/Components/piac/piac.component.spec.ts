import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiacComponent } from './piac.component';

describe('PiacComponent', () => {
  let component: PiacComponent;
  let fixture: ComponentFixture<PiacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PiacComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PiacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
