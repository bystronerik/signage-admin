import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Entity } from '@core/shared/entity';

@Component({
  selector: 'app-datagrid-item',
  templateUrl: './datagrid-item.component.html',
  styleUrls: ['./datagrid-item.component.scss'],
})
export class DatagridItemComponent implements OnInit {
  @Input() entity: any;
  @Input() entityFields: Entity;
  @Output() showItem = new EventEmitter<string>();
  @Output() deleteItem = new EventEmitter<string>();
  totalItems: number;

  constructor() {}

  ngOnInit(): void {}

  show(value) {
    this.showItem.emit(value);
  }

  delete(value) {
    this.deleteItem.emit(value);
  }
}
