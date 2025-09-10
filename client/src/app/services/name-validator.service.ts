import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class NameValidatorService {

  invalidNameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const regex = new RegExp(/^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[ '\-][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/);
      const isValid = regex.test(control.value);
      return isValid ? null : { invalidText: 'Invalid Name' }
    }
  }
}
 