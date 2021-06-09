import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityContentComponent } from './entity-content.component';

describe('EntityContentComponent', () => {
  let component: EntityContentComponent;
  let fixture: ComponentFixture<EntityContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntityContentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
