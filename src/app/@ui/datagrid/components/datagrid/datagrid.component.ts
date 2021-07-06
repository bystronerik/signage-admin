import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { FindInput } from '@core/graphql/findinput';
import { Entity, EntityField, ShowingPlace } from '@core/shared/entity';
import { EntityDataLoader } from '@core/shared/entity/entity.data-loader';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-datagrid',
  templateUrl: './datagrid.component.html',
  styleUrls: ['./datagrid.component.scss'],
})
export class DatagridComponent implements OnInit {
  @Input() dataLoader: EntityDataLoader;
  @Input() entity: Entity;
  @Input() showCount = true;
  @Output() detailItem = new EventEmitter<string>();
  @Output() addItem = new EventEmitter<any>();
  @Output() deleteItem = new EventEmitter<string>();

  data: Observable<any>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.dataLoader.subscribe(this.loadItems, this);
    this.loadItems();
  }

  loadItems(this: DatagridComponent): void {
    this.route.paramMap.subscribe((params) => {
      const input = new FindInput();
      if (params.has('id')) {
        input.id = params.get('id');
      }
      this.data = this.dataLoader.loadItems(input);
    });
  }

  getDetailItem(value: string) {
    this.detailItem.emit(value);
  }

  add() {
    this.addItem.emit();
  }

  delete(value: string) {
    this.deleteItem.emit(value);
  }
}
