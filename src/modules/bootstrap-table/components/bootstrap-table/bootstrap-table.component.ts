import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'matt-tw-bootstrap-table',
  templateUrl: './bootstrap-table.component.html',
  styleUrls: ['./bootstrap-table.component.scss']
})
export class BootstrapTableComponent {

  @Input() isShowTotal = true;
  @Input() isShowAmount = false;
  @Input() isShowReloadButton = true;
  @Input() total = 0;
  @Input() showAmount = 50;
  @Input() tableClass = 'table-striped';
  @Output() reload = new EventEmitter();

  constructor() {
  }

  onReload() {
    this.reload.emit();
  }
}
