import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatagridComponent } from './components/datagrid/datagrid.component';
import { DatagridItemComponent } from './components/datagrid-item/datagrid-item.component';

@NgModule({
  declarations: [DatagridComponent, DatagridItemComponent],
  exports: [DatagridComponent],
  imports: [CommonModule],
})
export class DatagridModule {}
