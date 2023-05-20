import { FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

export const customPatternValidator = (pattern: RegExp | string, message: string): ValidatorFn => {
  return (control: FormControl): ValidationErrors | null => {
    if (control.dirty && control.value && !control.value.match(pattern)) {
      return { message };
    }
    return null;
  };
};

export interface ValidationRules {
  minLength: number | null;
  maxLength: number | null;
  pattern: string | null;
}

export const getValidators = (config: ValidationRules, required = true): ValidatorFn[] => {
  let validators = required ? [Validators.required] : [];
  if (config.minLength) validators.push(Validators.minLength(config.minLength));
  if (config.maxLength) validators.push(Validators.maxLength(config.maxLength));
  if (config.pattern) validators.push(Validators.pattern(config.pattern));
  return validators;
}

export const getCityValidators = (): ValidatorFn[] =>
  getValidators({ minLength: 2, maxLength: 25, pattern: '\\D+' });

export const getRegionValidators = (): ValidatorFn[] =>
  getValidators({ minLength: null, maxLength: 25, pattern: '[А-ЩЮЯІЇЄҐа-щьюяіїєґ\' -]+' }, false);

export const getStreetValidators = (): ValidatorFn[] =>
  getValidators({ minLength: 2, maxLength: 50, pattern: '\\D+' });

export const getZipCodeValidators = (): ValidatorFn[] =>
  getValidators({ minLength: 5, maxLength: null, pattern: '\\d{5}' });

export const getProcurementItemTitleValidators = (): ValidatorFn[] =>
  getValidators({ minLength: 2, maxLength: 100, pattern: '\\D+' });

export const getRequestQuantityValidators = (): ValidatorFn[] =>
  getValidators({ minLength: null, maxLength: 10, pattern: '\\d+' });

export const getEmailValidators = (): ValidatorFn[] =>
  getValidators({ minLength: null, maxLength: 25, pattern: '^[a-z0-9]{3,}@[a-z]+\\.[a-z]{2,4}' });

export const getPasswordValidators = (): ValidatorFn[] =>
  getValidators({ minLength: 8, maxLength: 32, pattern: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$' });

export const getUserDataValidators = (): ValidatorFn[] =>
  getValidators({ minLength: 2, maxLength: 25, pattern: '\\D+' });
