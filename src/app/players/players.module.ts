import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingPage } from '@app/players/pages/listing/listing.page';
import { PlayersRoutingModule } from '@app/players/players-routing.module';
import { EditPage } from '@app/players/pages/edit/edit.page';
import { DetailPage } from '@app/players/pages/detail/detail.page';
import { FormsModule } from '@angular/forms';
import { LayoutModule } from '@ui/+layout/layout.module';
import { ModalModule } from '@ui/modal/modal.module';
import { AlertModule } from '@ui/alert/alert.module';
import { DatagridModule } from '@ui/datagrid/datagrid.module';

@NgModule({
  declarations: [ListingPage, DetailPage, EditPage],
  imports: [CommonModule, PlayersRoutingModule, FormsModule, LayoutModule, ModalModule, AlertModule, DatagridModule],
})
export class PlayersModule {}
