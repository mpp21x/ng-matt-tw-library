/*
 * Public API Surface of ng-matt-tw-library
 */
/**
 * lib
 */
/** check */
import {NgModule} from '@angular/core';
import {BootstrapFormModule} from './modules/bootstrap-form/bootstrap-form.module';
import {BootstrapTableModule} from './modules/bootstrap-table/bootstrap-table.module';
import {FormModule} from './modules/form/form.module';
import {BootstrapPaginationTableComponent} from './modules/bootstrap-table/components/bootstrap-pagination-table/bootstrap-pagination-table.component';


export {checkIsIpv4} from './lib/check/check-is-ipv4';
export {checkIsMatchInOneTypes} from './lib/check/check-is-match-in-one-types';
export {checkIsOverOneDay} from './lib/check/check-is-over-one-day';
export {checkIsUrl} from './lib/check/check-is-url';
export {checkStringIsDate} from './lib/check/check-string-is-date';
/** date */
export {oneDayPeriod, fromStartToEndPeriod, startDay, endDay} from './lib/date/one-day-period';
/** download file */
export {exportCsvFile} from './lib/file-download/export-csv-file';
export {saveFileResponse} from './ng-lib/file-download/save-file-response';
/** show error */
export {showFormErrors} from './ng-lib/form/show-form-errors';
/** helper */
export {createHttpParams} from './ng-lib/http/create-http-params';
export {StatusCode} from './lib/http/status-code';
/** paginator */
export {Paginator} from './lib/paginator/paginator';
/** rxjs */
export {cleanSubscriptionToUnsub} from './lib/rxjs/helpers';
/** utils */
export {escapeHtml} from './lib/utils/escape-html';
export {fillZeroWhenLessThanTen} from './lib/utils/fill-zero-when-less-than-ten';
export {getLastOne} from './lib/utils/get-last-one';
export {isEmptyExceptZero} from './lib/utils/is-empty-except-zero';
export {isNilOrEmpty} from './lib/utils/is-nil-or-empty';
export {nestedPropIsExists} from './lib/utils/nested-prop-is-exists';
export {numberFormat} from './lib/utils/number-format';
export {prettyJsonString} from './lib/utils/pretty-json-string';
export {randomString} from './lib/utils/random-string';
export * from './lib/utils/string-or-number-type';
/**
 * modules
 */
/** Form */
export {BaseFormHelperFactory} from './modules/form/lib/base-form-helper-factory';
export {LaravelHttpErrorMessage} from './modules/form/lib/plugin/laravel-http-error-message';
export {NgErrorMessager} from './modules/form/lib/plugin/ng-error-messager';
export {NgxSpinnerLoading} from './modules/form/lib/plugin/ngx-spinner-loading';
export {SweetalertEnding} from './modules/form/lib/plugin/sweetalert-ending';
export {FormEnding} from './modules/form/lib/form-ending';
export {FormHelper} from './modules/form/lib/form-helper';
export {FormHttpErrorMessager} from './modules/form/lib/form-http-error-messager';
export {FormLoading} from './modules/form/lib/form-loading';
export {FormNgErrorMessager} from './modules/form/lib/form-ng-error-messager';

export {RequiredLabelDirective} from './modules/form/directives/required-label.directive';

export {checkHasValidator} from './modules/form/validators/check-has-validator';
export {ValidatorIpv4} from './modules/form/validators/validator-ipv4';
export {ValidatorPasswordMustSame} from './modules/form/validators/validator-password-must-same';
export {ValidatorUrl} from './modules/form/validators/validator-url';
export {ValidatorsCheckDate} from './modules/form/validators/validators-check-date';

export {FormModule} from './modules/form/form.module';
/** Bootstrap Form */
export {BootstrapInputComponent} from './modules/bootstrap-form/components/bootstrap-input/bootstrap-input.component';
export {BootstrapFormModule} from './modules/bootstrap-form/bootstrap-form.module';
/** Bootstrap Table */
export {BootstrapTableComponent} from './modules/bootstrap-table/components/bootstrap-table/bootstrap-table.component';
export {
  BootstrapPaginationTableComponent
} from './modules/bootstrap-table/components/bootstrap-pagination-table/bootstrap-pagination-table.component';
export {BootstrapTableModule} from './modules/bootstrap-table/bootstrap-table.module';

const MODULES = [
  FormModule,
  BootstrapFormModule,
  BootstrapTableModule
];

@NgModule({imports: MODULES, exports: MODULES})
export class MattTwModule {
}
