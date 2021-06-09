import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-entity-header',
  templateUrl: './entity-header.component.html',
  styleUrls: ['./entity-header.component.scss'],
})
export class EntityHeaderComponent implements OnInit {
  @Input() title: string;

  constructor() {}

  ngOnInit(): void {}
}
