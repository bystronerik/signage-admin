import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { AppAlert } from '@core/shared/app-alert';

@Component({
  selector: 'app-alert-item',
  templateUrl: './alert-item.component.html',
  styleUrls: ['./alert-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AlertItemComponent implements OnInit {
  @Output() dismiss = new EventEmitter<void>();
  @Input() data: AppAlert;

  constructor() {}

  ngOnInit(): void {}

  dismissAlert(): void {
    this.dismiss.emit();
  }
}
