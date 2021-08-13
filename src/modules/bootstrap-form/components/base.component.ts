import {AbstractControl, FormControl, Validators} from '@angular/forms';
import {Component, Input} from '@angular/core';
import * as R from 'ramda';
import {checkHasValidator} from '../../form/validators/check-has-validator';

@Component({
  template: '',
})
export class BaseComponent {

  @Input() isRequired = false;
  @Input() control: AbstractControl;

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
    return this.control as FormControl;
  }


}
