import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input() control?: FormControl;
  @Input() label: string;
  @Input() type = 'text';
  @Input() placeholder: string;
  @Input() model?: string;
  @Input() disabled = false;
  @Input() required = true;
  @Input() classList: string[] = [];

  getErrorMessage() {
    if (this.control?.errors?.required && this.control?.touched)
      return "Дане поле має бути заповнене"
    else if (this.control?.errors?.pattern && this.control?.touched && this.type !== 'password')
      return "Формат введених даних є неправильним"
    else if (this.control?.errors?.pattern && this.control?.touched && this.type === 'password')
      return "Слабкий пароль"
    else if (this.control?.errors?.minlength && this.control?.touched)
      return `${this.label} має бути мінімум ${this.control?.errors?.minlength['requiredLength']} символів у довжину`
    else if (this.control?.errors?.maxlength && this.control?.touched)
      return `${this.label} має бути максимум ${this.control?.errors?.maxlength['requiredLength']} символів у довжину`
    // else return 'Дане поле не проходить валідацію'
  }
}
