import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {AbstractControl, FormControl, Validators} from '@angular/forms';
import {checkHasValidator} from '../../../form/validators/check-has-validator';
import * as R from 'ramda';

@Component({
  selector: 'matt-tw-bootstrap-input',
  templateUrl: './bootstrap-input.component.html',
  styleUrls: ['./bootstrap-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BootstrapInputComponent implements OnChanges {
  @Input() labelText = '';
  @Input() isRequired: null | boolean = null;
  @Input() type: 'text' | 'file' | 'number' | 'time' | 'email' | 'password' = 'text';
  @Input() bgControl: AbstractControl;
  @Input() showIsInvalid = false;
  @Input() errorMessages = '';
  @Input() maxLength = 50;
  @Input() placeholder = '';
  @Input() disabled = false;

  constructor(
    protected readonly changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.changeDetectorRef.markForCheck();
  }

  showLabelIsRequired() {
    if (this.isRequired !== null) {
      return this.isRequired;
    } else if (this.isRequired === null && !R.is(FormControl, this.getControl())) {
      return false;
    } else {
      return checkHasValidator(this.getControl(), Validators.required);
    }
  }

  getControl() {
    return this.bgControl as FormControl;
  }
}
