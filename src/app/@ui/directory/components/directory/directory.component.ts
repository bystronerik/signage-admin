import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Directory, DirectoryService } from '@core/shared/directory';
import { FindDirectoryInput } from '@core/graphql/directory';
import { Asset, AssetService } from '@core/shared/asset';
import { FindAssetInput } from '@core/graphql/asset';
import { Router } from '@angular/router';
import { Path } from '@core/enums';
import { ModalService } from '@core/services';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss'],
})
export class DirectoryComponent implements OnInit {
  @Input() isRoot: boolean;
  @Input() data: Directory;
  @Output() detailItem = new EventEmitter<string>();
  @Output() addItem = new EventEmitter<any>();
  @Output() deleteItem = new EventEmitter<string>();

  public subDirectories: Directory[];
  public items: Asset[];

  constructor(
    private directoryService: DirectoryService,
    private assetService: AssetService,
    private router: Router,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.loadSubDirectories();
    this.loadItems();
  }

  loadSubDirectories(): void {
    const input = new FindDirectoryInput();
    input.parentDirectory = this.data.id;
    this.directoryService.findAll(input).subscribe(
      (directories) => {
        this.subDirectories = directories ? directories : [];
      },
      (error) => {
        this.subDirectories = [];
      }
    );
  }

  loadItems(): void {
    const input = new FindAssetInput();
    input.directory = this.data.id;
    this.assetService.findAll(input).subscribe(
      (items) => {
        this.items = items ? items : [];
        console.log(items);
      },
      (error) => {
        this.items = [];
        console.log(error);
      }
    );
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

  addDirectory() {
    this.router.navigate([Path.Directory, Path.DirectoryCreate]);
  }

  deleteDirectory() {
    this.modalService.open('delete-directory-modal');
  }

  submitDelete() {}
}
