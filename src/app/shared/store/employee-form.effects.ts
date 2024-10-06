import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import * as EmployeeFormActions from './employee-form.actions';

@Injectable()
export class EmployeeFormEffects {
  constructor(private actions$: Actions) {}

  // Add effects if needed
}