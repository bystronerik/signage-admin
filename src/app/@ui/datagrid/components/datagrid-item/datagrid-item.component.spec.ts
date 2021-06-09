import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatagridItemComponent } from './datagrid-item.component';

describe('DatagridItemComponent', () => {
  let component: DatagridItemComponent;
  let fixture: ComponentFixture<DatagridItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatagridItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatagridItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
