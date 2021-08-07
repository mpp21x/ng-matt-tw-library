import {FormGroup} from '@angular/forms';
import {FormHelper} from './form-helper';

export interface FormPage {
  form: FormGroup;
  helper: FormHelper;
}
