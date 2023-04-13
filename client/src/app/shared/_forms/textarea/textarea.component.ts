import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent {
  @Input() control?: FormControl;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() disabled = false;
  @Input() required = true;
  @Input() rows = 5;
  @Input() classList: string[] = [];
}
