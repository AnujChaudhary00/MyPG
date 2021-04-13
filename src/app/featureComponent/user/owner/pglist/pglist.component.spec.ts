import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PglistComponent } from './pglist.component';

describe('PglistComponent', () => {
  let component: PglistComponent;
  let fixture: ComponentFixture<PglistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PglistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
