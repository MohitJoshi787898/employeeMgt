import { createAction, props } from '@ngrx/store';

export const updateGeneralDetails = createAction(
  '[Employee Form] Update General Details',
  props<{ generalDetails: any }>()
);

export const updatePersonalDetails = createAction(
  '[Employee Form] Update Personal Details',
  props<{ personalDetails: any }>()
);

export const resetForm = createAction('[Employee Form] Reset Form');