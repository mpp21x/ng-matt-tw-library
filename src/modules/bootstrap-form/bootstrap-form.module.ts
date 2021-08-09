import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BootstrapInputComponent} from './components/bootstrap-input/bootstrap-input.component';
import {FormModule} from '../form/form.module';
import {ReactiveFormsModule} from '@angular/forms';
import { BootstrapRadioInputComponent } from './components/bootstrap-radio-input/bootstrap-radio-input.component';


@NgModule({
  declarations: [
    BootstrapInputComponent,
    BootstrapRadioInputComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormModule,
  ],
  exports: [
    BootstrapInputComponent,
  ]
})
export class BootstrapFormModule {
}
