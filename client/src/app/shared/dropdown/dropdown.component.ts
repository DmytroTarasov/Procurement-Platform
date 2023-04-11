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
  @Input() props: string[];
  @Input() displayLabel = true;
  @Input() errorMessage: string;
}
