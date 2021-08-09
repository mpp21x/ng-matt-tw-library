import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BootstrapTableComponent } from './components/bootstrap-table/bootstrap-table.component';



@NgModule({
  declarations: [
    BootstrapTableComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BootstrapTableComponent
  ]
})
export class BootstrapTableModule { }
