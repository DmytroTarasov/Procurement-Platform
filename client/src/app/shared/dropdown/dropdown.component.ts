import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

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
  @Input() required = true;
  @Input() errorMessage: string;
  @Input() optionValueProp = 'id';
  @Input() emitSelectionChangeEvent = false;
  @Output() onSelectionChange: EventEmitter<any> = new EventEmitter();

  getErrorMessage() {
    if (this.control?.errors?.required && this.control?.touched)
    return this.errorMessage ? this.errorMessage : (this.label + ' має бути обрана');
  }

  selectionChange(event: MatSelectChange) {
    if (this.emitSelectionChangeEvent) {
      this.onSelectionChange.emit(event.value);
    }
  }
}
