import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { FindInput } from '@core/graphql/findinput';
import { Entity, EntityField, ShowingPlace } from '@core/shared/entity';
import { EntityDataLoader } from '@core/shared/entity/entity.data-loader';

@Component({
  selector: 'app-datagrid',
  templateUrl: './datagrid.component.html',
  styleUrls: ['./datagrid.component.scss'],
})
export class DatagridComponent implements OnInit {
  @Input() dataLoader: EntityDataLoader;
  @Input() entity: Entity;
  @Output() detailItem = new EventEmitter<string>();
  @Output() addItem = new EventEmitter<any>();
  @Output() deleteItem = new EventEmitter<string>();

  data: Observable<any>;

  constructor() {
  }

  ngOnInit(): void {
    this.dataLoader.subscribe(this.loadItems);
    this.loadItems();
  }

  getDetailItem(value: string) {
    this.detailItem.emit(value);
  }

  loadItems(): void {
    this.data = this.dataLoader.loadItems(new FindInput());
  }

  add() {
    this.addItem.emit();
  }

  delete(value: string) {
    this.deleteItem.emit(value);
  }
}
