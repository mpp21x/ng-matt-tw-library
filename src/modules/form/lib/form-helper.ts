import {FormGroup, ValidationErrors} from '@angular/forms';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {setFormFieldErrorsFromNgValidators} from './set-form-field-errors-from-ng-validators';
import * as R from 'ramda';
import {FormPage} from './form-page';
import {StatusCode} from '../../../lib/http/status-code';
import {NgxSpinnerService} from 'ngx-spinner';
import swal from 'sweetalert2';

export class FormHelper {
  isLoading = false;
  /** Laravel Validation Error Message */
  errorMessagesFromResponse: {
    [controlName: string]: string[];
  } = {};

  constructor(
    public readonly spinner: NgxSpinnerService,
    private readonly form: FormGroup
  ) {
  }

  unableToSendRequest(): boolean {
    this.form.markAllAsTouched();
    if (this.isLoading) {
      return true;
    }
    this.startLoading();
    if (this.form.invalid) {
      this.endLoading(false, '表單尚未輸入完！請輸入完後再次提交');
      return true;
    }
    return false;
  }

  async endLoading(operationResult: boolean, msg = '未知錯誤', detailMsg = '') {
    this.isLoading = false;

    this.hideSpinner();
    return swal.fire(msg, detailMsg, operationResult ? 'success' : 'error');
  }


  defaultFormSubmitSuccessFn() {
    return R.curry(async (statusCode: StatusCode, res: HttpResponse<any>) => {
      const results: [boolean, string?, string?] = res.status === statusCode ?
        [true, '儲存成功'] :
        [false];
      return await this.endLoading(...results);
    });
  }

  /**
   * Better
   */
  defaultFormSubmitFailedFn(): (res: HttpErrorResponse) => void {
    return (res: HttpErrorResponse): void => {

      this.spinner.hide();
      if (res.status === StatusCode.UNAUTHORIZED) {
        return;
      }
      let detailMessage = '';
      switch (res.status) {
        case StatusCode.UNPROCESSABLE_ENTITY:
        case StatusCode.CONFLICT:
          this.setFormErrorByLaravelResponse(res.error.errors);
          detailMessage = '表單輸入不允許的數值，請修改表單';
          break;
        default:
          detailMessage = '連線異常！請稍後再試';
          break;
      }
      this.endLoading(false, '儲存失敗', detailMessage);
      return;
    };
  }

  setFormErrorByLaravelResponse(errors: { [key: string]: string[] }): void {
    for (const [fieldName, messages] of Object.entries(errors)) {
      this.errorMessagesFromResponse[fieldName] = messages.map((message) => {
        if (message.includes('has already been taken.')) {
          message = '此欄位無法重複輸入相同數值';
        }
        return message;
      });
      const abstractControl = this.form.get(fieldName);
      if (!abstractControl) {
        continue;
      }
      abstractControl.setErrors({invalid_from_api_response: true});
    }
  }

  controlIsInvalid(controlName: string): boolean {
    try {
      const control = this.form.get(controlName);

      return control.invalid && control.touched;
    } catch (e) {
      return false;
    }
  }

  controlMessage(controlName: string, errors?: ValidationErrors): string[] {
    errors = errors || this.form.get(controlName).errors;
    let errorMessages = setFormFieldErrorsFromNgValidators(errors);
    errorMessages = errorMessages.concat(this.errorMessagesFromResponse[controlName] || []);

    return errorMessages;
  }

  formPageBind(): FormPage {
    return {
      form: this.form,
      helper: this,
    };
  }

  handleResponse(successStatusCode: StatusCode) {
    return {
      next: this.defaultFormSubmitSuccessFn()(successStatusCode),
      error: this.defaultFormSubmitFailedFn(),
    };
  }

  private startLoading(): void {
    this.isLoading = true;
    this.errorMessagesFromResponse = {};

    this.showSpinner();
  }

  private showSpinner(): Promise<unknown> {
    return this.spinner.show();
  }

  private hideSpinner(): Promise<unknown> {
    return this.spinner.hide();
  }

}
