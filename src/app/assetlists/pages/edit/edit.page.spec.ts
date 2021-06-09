import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPage } from './edit.page';

describe('EditComponent', () => {
  let component: EditPage;
  let fixture: ComponentFixture<EditPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditPage],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
