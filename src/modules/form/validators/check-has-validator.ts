import {FormControl, ValidatorFn} from '@angular/forms';
import * as R from 'ramda';

export function checkHasValidator(control: FormControl, validatorFn: ValidatorFn) {
  if (!control || !R.has('_rawValidators', control)) {
    return false;
  }
  const validators = (control as { '_rawValidators': ValidatorFn[] })._rawValidators;
  console.log(`validators`);
  console.log(validators);
  if (!Array.isArray(validators)) {
    return false;
  } else if (validators.includes(validatorFn)) {
    return true;
  }

  return false;
}
