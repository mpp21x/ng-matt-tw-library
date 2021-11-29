import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {AbstractControl, FormControl, Validators} from '@angular/forms';
import {checkHasValidator} from '../../../form/validators/check-has-validator';
import * as R from 'ramda';

@Component({
  selector: 'matt-tw-bootstrap-input',
  templateUrl: './bootstrap-input.component.html',
  styleUrls: ['./bootstrap-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BootstrapInputComponent  {
  @Input() labelText = '';
  @Input() isRequired: null | boolean = null;
  @Input() type: 'text' | 'file' | 'number' | 'time' | 'email' | 'password' = 'text';
  @Input() control: AbstractControl;
  @Input() showIsInvalid = false;
  @Input() errorMessages = '';
  @Input() maxLength = 50;
  @Input() placeholder = '';

  showLabelIsRequired() {
    if (this.isRequired !== null) {
      return this.isRequired;
    } else if (!R.is(FormControl, this.getControl())) {
      return false;
    } else {
      return checkHasValidator(this.getControl(), Validators.required);
    }
  }

  getControl() {
    return this.control as FormControl;
  }
}
