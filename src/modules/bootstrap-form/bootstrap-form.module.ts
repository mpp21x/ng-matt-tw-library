import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BootstrapInputComponent} from './components/bootstrap-input/bootstrap-input.component';
import {FormModule} from '../form/form.module';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    BootstrapInputComponent,
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
