import { createReducer, on } from '@ngrx/store';
import * as EmployeeFormActions from './employee-form.actions';

export interface EmployeeFormState {
  generalDetails: any;
  personalDetails: any;
}

export const initialState: EmployeeFormState = {
  generalDetails: {},
  personalDetails: {}
};

export const employeeFormReducer = createReducer(
  initialState,
  on(EmployeeFormActions.updateGeneralDetails, (state, { generalDetails }) => {
    console.log('Updating general details in reducer:', generalDetails);
    return {
      ...state,
      generalDetails: { ...state.generalDetails, ...generalDetails }
    };
  }),
  on(EmployeeFormActions.updatePersonalDetails, (state, { personalDetails }) => {
    console.log('Updating personal details in reducer:', personalDetails);
    return {
      ...state,
      personalDetails: { ...state.personalDetails, ...personalDetails }
    };
  }),
  on(EmployeeFormActions.resetForm, () => initialState)
);