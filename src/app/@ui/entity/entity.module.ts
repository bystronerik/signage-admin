import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityContentComponent } from './components/entity-content/entity-content.component';
import { EntityFormComponent } from './components/entity-form/entity-form.component';
import { EntityHeaderComponent } from './components/entity-header/entity-header.component';
import { EntityComponent } from './components/entity/entity.component';
import { EntityListingComponent } from './components/entity-listing/entity-listing.component';
import { DatagridModule } from '@ui/datagrid/datagrid.module';

@NgModule({
  declarations: [
    EntityContentComponent,
    EntityFormComponent,
    EntityHeaderComponent,
    EntityComponent,
    EntityListingComponent,
  ],
  imports: [CommonModule, DatagridModule],
})
export class EntityModule {}
