import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'matt-tw-bootstrap-pagination-table',
  templateUrl: './bootstrap-pagination-table.component.html',
  styleUrls: ['./bootstrap-pagination-table.component.scss'],
})
export class BootstrapPaginationTableComponent {

  @Input() isNotEmpty = true;
  @Input() perPage = 10;
  @Input() currentPage = 1;
  @Input() total = 0;
  @Input() tableClass = 'table-striped';

  @Output() changePage = new EventEmitter<number>();

  constructor() {
  }

  getTotal() {
    return this.total > 10000 ? 10000 : this.total;
  }

  onChangePage($event: number) {
    this.changePage.emit($event);
  }

  onSearch() {
    this.onChangePage(this.currentPage);
  }

  getIsNotEmpty() {
    return this.isNotEmpty;
  }
}
