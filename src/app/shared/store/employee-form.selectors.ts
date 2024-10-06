import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EmployeeFormState } from './employee-form.reducer';

/* export const selectEmployeeFormState = createFeatureSelector<EmployeeFormState>('employeeForm'); */

export const selectEmployeeFormState = (state: any) => state.employeeForm;

export const selectGeneralDetails = createSelector(
  selectEmployeeFormState,
  (state: EmployeeFormState) => state.generalDetails
);

export const selectPersonalDetails = createSelector(
  selectEmployeeFormState,
  (state: EmployeeFormState) => state.personalDetails
);

export const selectAllEmployeeDetails = createSelector(
  selectGeneralDetails,
  selectPersonalDetails,
  (generalDetails, personalDetails) => ({
    ...generalDetails,
    ...personalDetails
  })
);