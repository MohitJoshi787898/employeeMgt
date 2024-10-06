import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectPersonalDetails } from '../../../../shared/store/employee-form.selectors';
import * as EmployeeFormActions from '../../../../shared/store/employee-form.actions';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-family-details',
  templateUrl: './family-details.component.html',
  styleUrl: './family-details.component.css',
})
export class FamilyDetailsComponent implements OnInit {
  familyDetailsForm: FormGroup;
  get form(): FormGroup {
    return this.familyDetailsForm;
  }

  genderOptions = [
    { name: 'Male', value: 'Male' },
    { name: 'Female', value: 'Female' },
    { name: 'Other', value: 'Other' },
  ];

  bloodGroupOptions = [
    { name: 'A+', value: 'A+' },
    { name: 'A-', value: 'A-' },
    { name: 'B+', value: 'B+' },
    { name: 'B-', value: 'B-' },
    { name: 'AB+', value: 'AB+' },
    { name: 'AB-', value: 'AB-' },
    { name: 'O+', value: 'O+' },
    { name: 'O-', value: 'O-' },
  ];

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private sanitizer: DomSanitizer
  ) {
    this.familyDetailsForm = this.fb.group({
      gender: [''],
      emailId: [''],
      mobileNo: [''],
      location: [''],
      DOB: [null],
      birthPlace: [''],
      bloodGroup: [''],
    });
  }

  ngOnInit() {
    this.store.select(selectPersonalDetails).subscribe((personalDetails) => {
      if (personalDetails) {
        this.familyDetailsForm.patchValue(
          {
            ...personalDetails,
          },
          { emitEvent: false }
        );
      }
    });

    this.familyDetailsForm.valueChanges.subscribe((value) => {
      const sanitizedValue = {
        ...value,
        emailId: this.sanitizer.sanitize(1, value.emailId) || '',
        mobileNo: this.sanitizer.sanitize(1, value.mobileNo) || '',
        location: this.sanitizer.sanitize(1, value.location) || '',
        birthPlace: this.sanitizer.sanitize(1, value.birthPlace) || '',
        bloodGroup: this.sanitizer.sanitize(1, value.bloodGroup) || '',
      };
      console.log('Dispatching personal details:', sanitizedValue);
      this.store.dispatch(
        EmployeeFormActions.updatePersonalDetails({
          personalDetails: sanitizedValue,
        })
      );
    });
  }
}
