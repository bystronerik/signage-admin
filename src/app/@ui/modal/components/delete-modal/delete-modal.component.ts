import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { ConfirmModalComponent } from '@ui/modal/components/confirm-modal/confirm-modal.component';
import { ModalService } from '@core/services';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteModalComponent extends ConfirmModalComponent implements OnInit, OnDestroy {
  @Input() itemName: string;

  constructor(modalService: ModalService, el: ElementRef) {
    super(modalService, el);
    this.declineText = 'Zrušit';
    this.confirmText = 'Smazat';
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
