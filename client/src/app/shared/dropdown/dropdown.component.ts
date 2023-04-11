import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {
  @Input() control: FormControl;
  @Input() label: string;
  @Input() items: any[];
  @Input() displayProps: string[];
  @Input() displayLabel = true;
  @Input() errorMessage: string;
  @Input() optionValueProp = 'id';

  getErrorMessage() {
    if (this.control?.errors?.required && this.control?.touched)
    return this.errorMessage ? this.errorMessage : (this.label + ' має бути обрана');
  }
}
