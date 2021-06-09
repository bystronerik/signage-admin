import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ModalComponent } from '@ui/modal/components/modal/modal.component';
import { ModalService } from '@core/services';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent extends ModalComponent implements OnInit, OnDestroy {
  @Output() decline = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  @Input() declineText: string;
  @Input() confirmText: string;

  constructor(modalService: ModalService, el: ElementRef) {
    super(modalService, el);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  close(): void {
    this.decline.emit();
    super.close();
  }

  submit(): void {
    this.confirm.emit();
    super.close();
  }
}
