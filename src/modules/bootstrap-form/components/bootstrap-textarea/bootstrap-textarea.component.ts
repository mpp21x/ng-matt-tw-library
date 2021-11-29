import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {BaseComponent} from '../base.component';

@Component({
  selector: 'matt-tw-bootstrap-textarea',
  templateUrl: './bootstrap-textarea.component.html',
  styleUrls: ['./bootstrap-textarea.component.scss']
})
export class BootstrapTextareaComponent extends BaseComponent implements OnInit, OnChanges {

  @Input() labelText = '';
  @Input() isRequired: null | boolean = null;
  @Input() control: AbstractControl;
  @Input() rows = 5;
  @Input() showIsInvalid = false;
  @Input() errorMessages = '';
  @Input() maxLength = 50;
  @Input() placeholder = '';

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    console.log('ok');
  }

}

