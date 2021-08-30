import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OmgevingComponent } from './omgeving.component';

describe('OmgevingComponent', () => {
  let component: OmgevingComponent;
  let fixture: ComponentFixture<OmgevingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OmgevingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OmgevingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
