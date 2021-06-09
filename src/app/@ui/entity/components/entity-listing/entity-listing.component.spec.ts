import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityListingComponent } from './entity-listing.component';

describe('EntityListingComponent', () => {
  let component: EntityListingComponent;
  let fixture: ComponentFixture<EntityListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntityListingComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
