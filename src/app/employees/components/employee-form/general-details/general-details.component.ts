import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectGeneralDetails } from '../../../../shared/store/employee-form.selectors';
import * as EmployeeFormActions from '../../../../shared/store/employee-form.actions';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-general-details',
  templateUrl: './general-details.component.html',
  styleUrl: './general-details.component.css'
})
export class GeneralDetailsComponent implements OnInit{

  generalDetailsForm: FormGroup;
  get form(): FormGroup {
    return this.generalDetailsForm;
  }

  departments = [
    { name: 'IT', code: 'IT' },
    { name: 'HR', code: 'HR' },
    { name: 'Finance', code: 'Finance' },
    { name: 'Marketing', code: 'Marketing' },
    { name: 'Software Development', code: 'Software Development' },
    { name: 'Logistics', code: 'Logistics' },
    { name: 'Customer Service', code: 'Customer Service' },
    { name: 'Legal', code: 'Legal' }
  ];

  statuses = [
    { name: 'Active', code: 'Active' },
    { name: 'Inactive', code: 'Inactive' },
    { name: 'Draft', code: 'Draft' }
  ];

  constructor(private fb: FormBuilder, private store: Store, private sanitizer: DomSanitizer) {
    this.generalDetailsForm = this.fb.group({
      id: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      groupDOJ: ['', Validators.required],
      department: [''],
      designation: [''],
      status: ['']
    });
  }

  ngOnInit() {
    this.store.select(selectGeneralDetails).subscribe(generalDetails => {
      if (generalDetails) {
          this.generalDetailsForm.patchValue({
          ...generalDetails
        }, { emitEvent: false });
      }
    });

    this.generalDetailsForm.valueChanges.subscribe(value => {
      const updatedValue = {
        ...value,
        department: this.sanitizer.sanitize(1, value.department) || '',
        firstName: this.sanitizer.sanitize(1, value.firstName) || '',
        lastName: this.sanitizer.sanitize(1, value.lastName) || '',
        designation: this.sanitizer.sanitize(1, value.designation) || '',
        status: this.sanitizer.sanitize(1, value.status) || ''
      };
      console.log('Dispatching general details:', updatedValue);
      this.store.dispatch(EmployeeFormActions.updateGeneralDetails({ generalDetails: updatedValue }));
    });
  }

}