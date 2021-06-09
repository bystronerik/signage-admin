import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingPage } from './listing.page';

describe('ListingComponent', () => {
  let component: ListingPage;
  let fixture: ComponentFixture<ListingPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListingPage],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
