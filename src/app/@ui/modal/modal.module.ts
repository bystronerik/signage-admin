import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './components/modal/modal.component';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';

@NgModule({
  declarations: [ModalComponent, DeleteModalComponent, ConfirmModalComponent],
  imports: [CommonModule],
  exports: [ModalComponent, DeleteModalComponent, ConfirmModalComponent],
})
export class ModalModule {}
