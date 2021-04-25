import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrivencesComponent } from './grivences.component';

describe('GrivencesComponent', () => {
  let component: GrivencesComponent;
  let fixture: ComponentFixture<GrivencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrivencesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrivencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
