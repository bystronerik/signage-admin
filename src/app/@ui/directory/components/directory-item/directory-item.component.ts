import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Asset } from '@app/graphql';

@Component({
  selector: 'app-directory-item',
  templateUrl: './directory-item.component.html',
  styleUrls: ['./directory-item.component.scss'],
})
export class DirectoryItemComponent implements OnInit {
  @Input() item: Asset;
  @Output() showItem = new EventEmitter<string>();
  @Output() editItem = new EventEmitter<string>();
  @Output() deleteItem = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  show(value) {
    this.showItem.emit(value);
  }

  edit(value) {
    this.editItem.emit(value);
  }

  delete(value) {
    this.deleteItem.emit(value);
  }
}
