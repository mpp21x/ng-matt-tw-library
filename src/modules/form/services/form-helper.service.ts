import {Injectable} from '@angular/core';
import {FormHelper} from '../lib/form-helper';
import {FormGroup} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class FormHelperService {

  constructor(protected readonly spinner: NgxSpinnerService) {
  }


  createFormHelpe(form: FormGroup): FormHelper {
    return new FormHelper(this.spinner, form);
  }

}
