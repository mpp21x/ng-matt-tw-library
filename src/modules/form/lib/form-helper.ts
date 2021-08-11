import {FormGroup} from '@angular/forms';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import * as R from 'ramda';
import {StatusCode} from 'ng-matt-tw-library';
import {FormLoading} from './form-loading';
import {FormHttpErrorMessager} from './form-http-error-messager';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {FormEnding} from './form-ending';
import {NgErrorMessager} from './plugin/ng-error-messager';

export class FormHelper {
  isLoading = false;

  defaultErrorMessage = '儲存失敗';

  /** Laravel Validation Error Message */

  constructor(
    protected readonly loading: FormLoading,
    protected readonly ending: FormEnding<unknown>,
    protected readonly ngErrorMessager: NgErrorMessager,
    protected readonly httpErrorMessager: FormHttpErrorMessager,
    protected readonly _form: FormGroup
  ) {
  }

  unableToSubmit(): boolean {
    this._form.markAllAsTouched();
    if (this.isLoading) {
      return true;
    }
    this.isLoading = true;
    if (this._form.invalid) {
      this.endLoading(false, '表單尚未輸入完！請輸入完後再次提交');
      return true;
    }
    return false;
  }

  /**
   * 常用於清除預設值，以及開啟載入畫面
   */
  beforeSubmit() {
    this.httpErrorMessager.clean();
    this.loading.start();
  }

  async endLoading(result: boolean, msg: string, detailMsg = '') {
    this.isLoading = false;

    return this.ending.end({
      result,
      message: msg,
      detailMsg,
    });
  }


  defaultFormSubmitSuccessFn() {
    return R.curry(async (statusCode: StatusCode, res: HttpResponse<any>) => {
      const results: [boolean, string?, string?] = res.status === statusCode ?
        [true, '儲存成功'] :
        [false];
      return await this.endLoading(...results);
    });
  }

  defaultFormSubmitFailedFn(): (res: HttpErrorResponse) => void {
    return (res: HttpErrorResponse): void => {
      if (res.status === StatusCode.UNAUTHORIZED) {
        return;
      }
      let detailMessage = '';
      switch (res.status) {
        case StatusCode.UNPROCESSABLE_ENTITY:
        case StatusCode.CONFLICT:
          this.setFormErrorByResponse(res);
          detailMessage = '表單輸入不允許的數值，請修改表單';
          break;
        default:
          detailMessage = '連線異常！請稍後再試';
          break;
      }
      this.endLoading(false, this.defaultErrorMessage, detailMessage);
      return;
    };
  }

  /**
   * 常用於關閉載入畫面
   *
   * @param rx
   */
  afterSubmit(rx: Observable<any>) {
    return rx.pipe(tap({
      next: () => this.loading.end(),
      error: () => () => this.loading.end(),
    }));
  }

  setFormErrorByResponse(res: HttpErrorResponse): void {
    this.httpErrorMessager.setMessagesFromHttp(this._form, res);
  }

  controlIsInvalid(controlName: string): boolean {
    try {
      const control = this._form.get(controlName);

      return control.invalid && control.touched;
    } catch (e) {
      return false;
    }
  }

  controlMessage(controlName: string): string[] {
    if (!this.controlIsInvalid(controlName)) {
      return [];
    }
    let errorMessages = this.ngErrorMessager.getMessagesFromControlErrors(
      this._form.get(controlName).errors
    );
    errorMessages = errorMessages.concat(this.httpErrorMessager.getMessage(controlName));

    return errorMessages;
  }

  subscribeHttpResult(successStatusCode: StatusCode) {
    return {
      next: this.defaultFormSubmitSuccessFn()(successStatusCode),
      error: this.defaultFormSubmitFailedFn(),
    };
  }

  get form(): FormGroup {
    return this._form;
  }
}
