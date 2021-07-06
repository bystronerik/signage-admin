import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectoryItemComponent } from './components/directory-item/directory-item.component';
import { DirectoryComponent } from './components/directory/directory.component';
import { ModalModule } from '@ui/modal/modal.module';

@NgModule({
  declarations: [DirectoryItemComponent, DirectoryComponent],
  exports: [DirectoryComponent],
  imports: [CommonModule, ModalModule],
})
export class DirectoryModule {}
