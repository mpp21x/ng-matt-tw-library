import {AbstractControl} from '@angular/forms';
import {SelectOption} from 'ng-matt-tw-library';

export function selectFirstOne(control: AbstractControl, options: SelectOption[]) {
  if (!options.length) {
    return false;
  }
  control.setValue(options[0].value);
  return true;
}
