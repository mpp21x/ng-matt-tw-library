import {ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {SelectOption} from '../../lib/select.option';
import * as R from 'ramda';
import {BaseComponent} from '../base.component';

@Component({
  selector: 'matt-tw-bootstrap-select',
  templateUrl: './bootstrap-select.component.html',
  styleUrls: ['./bootstrap-select.component.scss']
})
export class BootstrapSelectComponent extends BaseComponent implements OnInit, OnChanges {

  @Input() labelText = '';

  @Input() name = '';
  @Input() isMultiple = false;
  @Input() control: AbstractControl;
  @Input() showIsInvalid = false;
  @Input() errorMessages = '';

  @Input() options: SelectOption[] = [];
  @Input() size = 5;

  @Output() changeSelect = new EventEmitter<Event>();

  constructor(readonly change: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.change.markForCheck();
    this.change.detectChanges();
  }

  isSelected(option: SelectOption): boolean {
    if (!this.isMultiple) {
      return option.value === this.getControl().value;
    }

    if (!R.is(Array, this.getControl().value)) {
      throw new Error(`${this.name} is not array(bg select input component)`);
    }
    return this.getControl().value.includes(option.value);
  }
}
